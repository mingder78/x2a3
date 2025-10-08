// src/pages/api/countries.ts
import { request, gql } from 'graphql-request';

export async function GET() {
  const endpoint = 'https://node.cyberfly.io/graphql';

  // 定義 GraphQL 查詢
  const query = gql`
    query {
     nodeInfo {
    peerId }
    }
  `;

  try {
    // 發送 GraphQL 請求
    const data = await request(endpoint, query);
console.log(data)
    // 回傳 JSON 格式的回應
    return new Response(JSON.stringify({ countries: data.countries }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    // 錯誤處理
    return new Response(JSON.stringify({ error: 'Failed to fetch countries' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}