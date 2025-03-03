<div align="center">
  <img src="https://storage.googleapis.com/hume-public-logos/hume/hume-banner.png">
  <h1>EVI Next.js App Router Example</h1>
</div>

![preview.png](preview.png)

## Overview

This project features a sample implementation of Hume's [Empathic Voice Interface](https://hume.docs.buildwithfern.com/docs/empathic-voice-interface-evi/overview) using Hume's React SDK. Here, we have a simple EVI that uses the Next.js App Router.

## Sarcasm Detection Algorithm

This application includes an enhanced sarcasm detection feature that analyzes emotional signals from Hume's Empathic Voice Interface. The algorithm works by:

1. **Identifying key sarcasm indicators**: The algorithm looks for specific emotions that often indicate sarcasm, including:
   - Amusement
   - Contempt
   - Disappointment
   - Awkwardness

2. **Analyzing misleading emotions**: It evaluates potentially misleading emotions that might appear high during sarcastic speech:
   - Excitement
   - Joy
   - Satisfaction
   - Pride

3. **Score calculation**: The sarcasm detector computes a score using multiple factors:
   - Base score from the average of indicator emotions above a threshold (0.15)
   - Specific emotion pattern bonuses:
     - Amusement + contempt combination (+0.2)
     - High awkwardness (+0.15)
     - Contradictory positive and negative emotions (+0.25)
     - Multiple high emotions indicating complexity (+0.1)
     - Lack of dominant emotion (+0.1)

4. **Threshold application**: Sarcasm is reported to the user when the computed score exceeds 0.2.

This algorithm provides real-time feedback on potential sarcasm detection, enhancing the EVI's ability to understand nuanced emotional contexts in conversation.

### Sarcasm Detection Table

The following table showcases how the sarcasm detection system evaluates different emotions:

| Emotion | Score | Color Code | Sarcasm Logic Description |
|---------|-------|------------|--------------------------|
| Sarcasm Detected | 1.00 | #8B0000 (Dark Red) | The statement's overriding ironic twist—this is the core signal of sarcasm. |
| Awkwardness | 0.69 | #B22222 (Firebrick Red) | Reflects noticeable social tension from the self-contradiction. |
| Amusement | 0.49 | #FF8C00 (Dark Orange) | Indicates a playful, humorous element that softens the irony. |
| Embarrassment | 0.17 | #90EE90 (Light Green) | A subtle hint of self-consciousness in the contradictory claim. |
| Disappointment | 0.12 | #7FFF00 (Chartreuse) | Suggests a mild ironic letdown, as if expectations aren't quite met. |
| Contempt | 0.11 | #7CFC00 (Lawn Green) | A slight critical edge—almost a mock scorn—underneath the humorous tone. |
| Realization | 0.10 | #ADFF2F (Green Yellow) | A very gentle nod to the awareness of the contradiction at play. |

## Project deployment

Click the button below to deploy this example project with Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fhumeai%2Fhume-evi-next-js-starter&env=HUME_API_KEY,HUME_CLIENT_SECRET)

Below are the steps to completing deployment:

1. Create a Git Repository for your project.
2. Provide the required environment variables. To get your API key and Client Secret key, log into the portal and visit the [API keys page](https://beta.hume.ai/settings/keys).
