## Overview

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

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or later recommended)
- [pnpm](https://pnpm.io/) package manager
- A Hume API key (for access to the Empathic Voice Interface)

### Installation

1. Clone this repository:
   ```bash
   git clone <repository-url>
   cd evi-next-js-app-router
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory with your Hume API key:
   ```
   HUME_API_KEY=your_api_key_here
   ```

### Development

To start the development server:

```bash
pnpm dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

### Build for Production

To create a production build:

```bash
pnpm build
```

To preview the production build locally:

```bash
pnpm start
```
