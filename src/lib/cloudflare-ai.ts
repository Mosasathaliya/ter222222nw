
'use server';

const CLOUDFLARE_AI_GATEWAY_URL = process.env.CLOUDFLARE_AI_GATEWAY_URL;
const CLOUDFLARE_API_TOKEN = process.env.CLOUDFLARE_API_TOKEN;

if (!CLOUDFLARE_AI_GATEWAY_URL || !CLOUDFLARE_API_TOKEN) {
  throw new Error("Cloudflare AI Gateway URL or API Token are not set in the environment variables.");
}

type AiModel = 
  | '@cf/meta/llama-3-8b-instruct'
  | '@cf/meta/m2m100-1.2b'
  | '@cf/baai/bge-reranker-base'
  | '@cf/stabilityai/stable-diffusion-xl-base-1.0'
  | '@cf/myshell-ai/melotts'
  | '@cf/openai/whisper';

interface RunAiOptions {
  model: AiModel;
  inputs: object;
  stream?: boolean;
}

/**
 * A centralized function to run any Cloudflare AI model via the AI Gateway.
 * @param model The AI model to run.
 * @param inputs The inputs for the model.
 * @param stream Whether to stream the response (for text generation).
 * @returns The model's response.
 */
export async function runAi({ model, inputs, stream = false }: RunAiOptions) {
  // Construct the full URL for the model endpoint via the gateway
  const modelUrl = new URL(model, CLOUDFLARE_AI_GATEWAY_URL).href;

  const body = (model.includes('llama') && stream) ? { ...inputs, stream: true } : inputs;

  const response = await fetch(modelUrl, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${CLOUDFLARE_API_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error(`Cloudflare AI Gateway error for model ${model}:`, errorText);
    throw new Error(`Cloudflare AI Gateway request failed: ${response.statusText}`);
  }

  // The gateway directly streams the model's response, so we can return it as-is.
  return response;
}
