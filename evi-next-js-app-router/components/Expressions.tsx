"use client";
import { Hume } from "hume";
import { expressionColors, isExpressionColor } from "@/utils/expressionColors";
import { motion } from "framer-motion";
import { CSSProperties, useState } from "react";
import * as R from "remeda";

// We'll use this type to safely access emotion keys
type EmotionKey = keyof Hume.empathicVoice.EmotionScores;

export default function Expressions({
  values,
}: {
  values: Hume.empathicVoice.EmotionScores | undefined;
}) {
  const [showAllEmotions, setShowAllEmotions] = useState(false);
  
  if (!values) return null;

  // Refined sarcasm indicators based on analysis
  const sarcasmIndicators: EmotionKey[] = [
    "amusement",
    "contempt",
    "disappointment",
    "awkwardness",
    "realization",   // Added as they often indicate realizing a contradiction
    "surpriseNegative", // Added as it can indicate unexpected contradiction
    "doubt",        // Added as it signals uncertainty that often appears in sarcasm
    "confusion",    // Added as it can indicate cognitive dissonance in sarcasm
    "anger"         // Added as suppressed anger often appears in passive-aggressive sarcasm
  ];

  // Emotions that might appear high but could be misleading in sarcasm
  const misleadingEmotions: EmotionKey[] = [
    "excitement",
    "joy",
    "satisfaction",
    "pride",
    "interest",     // Added as it can mask sarcastic intent
    "determination", // Added as it can appear in emphatic sarcasm
    "surprisePositive" // Added as it can appear in exaggerated sarcasm
  ];

  // Enhanced sarcasm detection function
  const detectSarcasm = (scores: Hume.empathicVoice.EmotionScores) => {
    // Get scores for sarcasm indicators with a higher threshold
    const indicatorScores = sarcasmIndicators
      .map((key) => scores[key] || 0)
      .filter((score) => score > 0.15);

    // Get scores for potentially misleading emotions
    const misleadingScores = misleadingEmotions
      .map((key) => scores[key] || 0)
      .filter((score) => score > 0.2);

    // Calculate base sarcasm score
    let sarcasmScore = 0;
    
    // Get all emotions and sort them by score (moved up from below)
    const allEmotions = R.values(scores);
    const sortedScores = allEmotions.sort((a, b) => b - a);

    // Single strong indicator can be enough to establish a base score
    const strongIndicators = sarcasmIndicators
      .map((key) => scores[key] || 0)
      .filter((score) => score > 0.25);
    
    if (strongIndicators.length > 0) {
      // Start with a base level of sarcasm if any strong indicator is present
      sarcasmScore = 0.15 + (strongIndicators[0] * 0.3);
    }

    // If we have multiple indicators, enhance the score
    if (indicatorScores.length >= 2) {
      // Base score from indicator emotions
      sarcasmScore = Math.max(
        sarcasmScore,
        indicatorScores.reduce((sum, score) => sum + score, 0) / indicatorScores.length
      );

      // Specific sarcasm patterns
      if (scores.amusement > 0.2 && scores.contempt > 0.1) {
        sarcasmScore += 0.2; // Strong sarcasm signal
      }

      if (scores.awkwardness > 0.3) {
        sarcasmScore += 0.15; // High awkwardness boost
      }

      // Contradiction pattern: positive and negative emotions
      const indicatorEmotionScores = sarcasmIndicators
        .map((key) => scores[key] || 0)
        .filter((score) => score > 0.1);
      if (misleadingScores.length >= 1 && indicatorEmotionScores.length >= 1) {
        sarcasmScore += 0.25; // Mixed emotions detected
      }

      // New condition: Multiple high emotions (conflict indicator)
      const numHighEmotions = allEmotions.filter((score) => score > 0.15).length;
      if (numHighEmotions >= 3) {
        sarcasmScore += 0.1; // Emotional complexity suggests sarcasm
      }

      // New condition: No clear dominant emotion
      if (sortedScores[0] - sortedScores[1] < 0.1) {
        sarcasmScore += 0.1; // Lack of dominance suggests mixed intent
      }
    }

    // Additional patterns that might indicate sarcasm even without multiple indicators
    
    // Pattern: High contempt with any other high emotion often signals sarcasm
    if ((scores.contempt || 0) > 0.18) {
      sarcasmScore = Math.max(sarcasmScore, 0.3);
    }
    
    // Pattern: Realization with amusement often indicates catching onto a joke
    if ((scores.realization || 0) > 0.2 && (scores.amusement || 0) > 0.15) {
      sarcasmScore += 0.15;
    }
    
    // Pattern: High determination with misleading emotions can suggest emphatic sarcasm
    if ((scores.determination || 0) > 0.25 && misleadingScores.length > 0) {
      sarcasmScore += 0.15;
    }
    
    // *** NEW PATTERNS TO IMPROVE DETECTION ***
    
    // Pattern: Extremely high excitement or joy can be a sarcasm signal
    // This helps catch cases like "I am so excited. Not"
    if ((scores.excitement || 0) > 0.6 || (scores.joy || 0) > 0.5) {
      sarcasmScore += 0.2;
    }
    
    // Pattern: Anger present alongside positive emotions is often sarcastic
    if ((scores.anger || 0) > 0.15 && 
        ((scores.excitement || 0) > 0.15 || (scores.joy || 0) > 0.15)) {
      sarcasmScore += 0.25;
    }
    
    // Pattern: Very high single emotion with almost no supporting emotions
    // Often indicates exaggerated or fake emotion (sarcastic)
    const dominantEmotionRatio = sortedScores[0] / (sortedScores[1] || 0.01);
    if (sortedScores[0] > 0.4 && dominantEmotionRatio > 3) {
      sarcasmScore += 0.15;
    }
    
    // Pattern: High single positive emotion with negative undertones
    const hasNegativeUndertones = ['disappointment', 'contempt', 'disgust', 'anger', 'distress']
      .some(emotion => (scores[emotion as EmotionKey] || 0) > 0.10);
    
    if ((scores.excitement || 0) > 0.3 && hasNegativeUndertones) {
      sarcasmScore += 0.3;
    }
    
    // Pattern: Multiple contrasting emotions present (classic sarcasm signal)
    const positiveEmotions = ['excitement', 'joy', 'pride', 'satisfaction']
      .map(key => scores[key as EmotionKey] || 0)
      .filter(score => score > 0.15);
      
    const negativeEmotions = ['anger', 'disappointment', 'contempt', 'disgust']
      .map(key => scores[key as EmotionKey] || 0)
      .filter(score => score > 0.15);
    
    if (positiveEmotions.length > 0 && negativeEmotions.length > 0) {
      sarcasmScore += 0.3;
    }

    return Math.min(1, sarcasmScore);
  };

  // Calculate sarcasm score and determine if it should be displayed
  const sarcasmScore = detectSarcasm(values);
  const hasSarcasmIndicators = sarcasmScore > 0.18; // Lowered threshold for sensitivity

  // Get sorted emotions for display
  const sortedEmotions = R.pipe(
    values,
    R.entries(),
    R.sortBy(([_, value]) => -value),
  );

  // Group emotions into categories based on thresholds
  const primaryEmotions = sortedEmotions.filter(([_, value]) => value >= 0.3);
  const secondaryEmotions = sortedEmotions.filter(([_, value]) => value >= 0.15 && value < 0.3);
  const minorEmotions = sortedEmotions.filter(([_, value]) => value < 0.15);

  // Decide which emotions to display
  const visibleEmotions = showAllEmotions 
    ? sortedEmotions 
    : [...primaryEmotions, ...secondaryEmotions.slice(0, 3)];

  // Determine if we need a "show more" button
  const hasHiddenEmotions = !showAllEmotions && (secondaryEmotions.length > 3 || minorEmotions.length > 0);

  return (
    <div className="text-xs p-3 w-full border-t border-border flex flex-col gap-3">
      {/* Sarcasm indicator display - now more prominent if detected */}
      {hasSarcasmIndicators && (
        <div
          className="w-full overflow-hidden mb-1 p-3 rounded-md"
          style={{ background: "rgba(158, 68, 196, 0.15)" }}
        >
          <div className="flex items-center justify-between gap-1 font-mono pb-2">
            <div className="font-bold text-sm">
              Sarcasm Detected 👀
            </div>
            <div className="tabular-nums text-sm font-semibold">
              {(sarcasmScore * 100).toFixed(0)}%
            </div>
          </div>
          <div className="relative h-2">
            <div className="absolute top-0 left-0 size-full rounded-full opacity-10 bg-[#9e44c4]" />
            <motion.div
              className="absolute top-0 left-0 h-full bg-[#9e44c4] rounded-full"
              initial={{ width: 0 }}
              animate={{
                width: `${Math.min(100, sarcasmScore * 100)}%`,
              }}
            />
          </div>
        </div>
      )}

      {/* Primary emotions - displayed more prominently */}
      {primaryEmotions.length > 0 && (
        <div className="mb-2">
          <h3 className="text-xs font-medium mb-2 opacity-70">Primary Emotions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {primaryEmotions.map(([key, value]) => (
              <div 
                key={key} 
                className="overflow-hidden p-2 rounded-md"
                style={{
                  background: isExpressionColor(key) 
                    ? `rgba(${hexToRgb(expressionColors[key])}, 0.1)` 
                    : "rgba(var(--card), 0.8)",
                }}
              >
                <div className="flex items-center justify-between gap-1 font-mono pb-1">
                  <div className="font-medium truncate text-sm">
                    {key}
                    {sarcasmIndicators.includes(key as EmotionKey) && hasSarcasmIndicators && " ✓"}
                  </div>
                  <div className="tabular-nums opacity-70 font-semibold">{value.toFixed(2)}</div>
                </div>
                <div
                  className="relative h-2"
                  style={
                    {
                      "--bg": isExpressionColor(key)
                        ? expressionColors[key]
                        : "var(--bg)",
                    } as CSSProperties
                  }
                >
                  <div
                    className="absolute top-0 left-0 size-full rounded-full opacity-10 bg-[var(--bg)]"
                  />
                  <motion.div
                    className="absolute top-0 left-0 h-full bg-[var(--bg)] rounded-full"
                    initial={{ width: 0 }}
                    animate={{
                      width: `${R.pipe(
                        value,
                        R.clamp({ min: 0, max: 1 }),
                        (value) => `${value * 100}%`,
                      )}`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Secondary and minor emotions - less prominence */}
      {visibleEmotions.length > primaryEmotions.length && (
        <div>
          <h3 className="text-xs font-medium mb-2 opacity-70">Other Emotions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            {visibleEmotions.slice(primaryEmotions.length).map(([key, value]) => (
              <div key={key} className="overflow-hidden">
                <div className="flex items-center justify-between gap-1 font-mono pb-1">
                  <div className="font-medium truncate">
                    {key}
                    {sarcasmIndicators.includes(key as EmotionKey) && hasSarcasmIndicators && " ✓"}
                  </div>
                  <div className="tabular-nums opacity-50">{value.toFixed(2)}</div>
                </div>
                <div
                  className="relative h-1"
                  style={
                    {
                      "--bg": isExpressionColor(key)
                        ? expressionColors[key]
                        : "var(--bg)",
                    } as CSSProperties
                  }
                >
                  <div
                    className="absolute top-0 left-0 size-full rounded-full opacity-10 bg-[var(--bg)]"
                  />
                  <motion.div
                    className="absolute top-0 left-0 h-full bg-[var(--bg)] rounded-full"
                    initial={{ width: 0 }}
                    animate={{
                      width: `${R.pipe(
                        value,
                        R.clamp({ min: 0, max: 1 }),
                        (value) => `${value * 100}%`,
                      )}`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Show more/less toggle button */}
      {hasHiddenEmotions && (
        <button 
          onClick={() => setShowAllEmotions(!showAllEmotions)}
          className="text-xs self-center mt-1 px-3 py-1 bg-opacity-10 rounded-md hover:bg-opacity-20 transition-colors border"
        >
          {showAllEmotions ? "Show fewer emotions" : `Show all emotions (${sortedEmotions.length})`}
        </button>
      )}
    </div>
  );
}

// Helper function to convert hex color codes to RGB for transparency support
function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
    : "255, 255, 255";
}