<div align="center">
  <img src="https://storage.googleapis.com/hume-public-logos/hume/hume-banner.png">
  <h1>EVI Next.js App Router Example</h1>
</div>

![preview.png](preview.png)

## Overview

This project features a sample implementation of Hume's [Empathic Voice Interface](https://hume.docs.buildwithfern.com/docs/empathic-voice-interface-evi/overview) using Hume's React SDK. Here, we have a simple EVI that uses the Next.js App Router.

## Enhanced Sarcasm Detection

This application includes a sophisticated sarcasm detection feature that analyzes emotional signals from Hume's Empathic Voice Interface. The algorithm has been enhanced to detect even subtle forms of sarcasm with high accuracy.

### How It Works

The sarcasm detection system operates by:

1. **Identifying key sarcasm indicators**: The algorithm looks for specific emotions that often indicate sarcasm, including:
   - Amusement
   - Contempt
   - Disappointment
   - Awkwardness
   - Realization
   - Surprise (negative)
   - Doubt
   - Confusion
   - Anger

2. **Analyzing misleading emotions**: It evaluates potentially misleading emotions that might appear high during sarcastic speech:
   - Excitement
   - Joy
   - Satisfaction
   - Pride
   - Interest
   - Determination
   - Surprise (positive)

3. **Pattern recognition**: The system looks for specific patterns associated with sarcasm:
   - Amusement combined with contempt
   - Exaggerated positive emotions (very high excitement/joy)
   - Positive emotions with negative undertones
   - Multiple contrasting emotions present simultaneously
   - Anger alongside positive emotions
   - High single emotion with very few supporting emotions

4. **Contextual analysis**: The algorithm considers the emotional complexity and contradictions:
   - Multiple high emotions indicating complexity
   - Lack of dominant emotion
   - Contradiction between positive and negative emotions

5. **Threshold application**: Sarcasm is reported to the user when the computed score exceeds a threshold value.

### Interactive Tooltip

The sarcasm detection feature includes an interactive tooltip that provides detailed information about detected sarcasm:

- **Hover functionality**: Users can hover over the sarcasm indicator to see what factors contributed to the sarcasm detection
- **Contribution breakdown**: The tooltip displays specific patterns that were detected, how much each contributed to the overall score, and detailed explanations of why each pattern suggests sarcasm
- **Visual indicators**: Emotions that contributed to sarcasm detection are marked with a checkmark (✓) in the emotion display

### Sarcasm Detection Table

The following table showcases some key emotions and patterns evaluated by the sarcasm detection system:

| Pattern | Impact | Description |
|---------|--------|-------------|
| Amusement + Contempt | High | A classic sarcasm pattern combining humor with disdain |
| Exaggerated positive emotion | High | Unusually high excitement/joy that may indicate sarcastic exaggeration |
| Contrasting emotions | Very High | Simultaneous positive and negative emotions, a strong indicator of sarcasm |
| Anger + Positive emotion | High | Combination signals passive-aggressive sarcasm |
| Positive emotion + Negative undertones | Very High | Excitement with underlying negative emotions is a classic sarcasm pattern |
| Multiple sarcasm indicators | Medium | Multiple sarcasm-related emotions detected simultaneously |
| No dominant emotion | Low | Lack of clear emotional signals may suggest mixed or masked intent |

This enhanced algorithm provides real-time feedback on potential sarcasm detection, helping the EVI understand nuanced emotional contexts in conversations. The tooltip functionality adds transparency, allowing users to understand why certain statements were flagged as potentially sarcastic.

## Project deployment

Click the button below to deploy this example project with Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fhumeai%2Fhume-evi-next-js-starter&env=HUME_API_KEY,HUME_CLIENT_SECRET)

Below are the steps to completing deployment:

1. Create a Git Repository for your project.
2. Provide the required environment variables. To get your API key and Client Secret key, log into the portal and visit the [API keys page](https://beta.hume.ai/settings/keys).
