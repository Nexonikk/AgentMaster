import Retell from "retell-sdk";

// key_8d11c550475009e20ecd13547c23

const client = new Retell({
  apiKey: process.env.RETELL_API_KEY as string,
});

export default async function main() {
  const agentResponses = await client.agent.list();

  const llmResponses = async (llmId: string) => {
    const llmValue = await client.llm.retrieve(llmId);
    return llmValue;
  };

  // const llmResponse = await client.llm.retrieve(
  //   "llm_d5103a6b54a429a07e10f81d176e"
  // );

  return {
    agentResponses,
    llmResponses,
    // llmResponse,
  };
}
