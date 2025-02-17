import { BasicRequest, BasicResponse, Context } from "./@types";

const defaultHeaders = {
  'Content-Type': 'application/json',
} as const

export const GET = async <T>(
  context: Context,
  request: BasicRequest,
): Promise<BasicResponse<T>> => {
  const { headers, path } = request;

  try {
    const response = await context.instance.get(`${path}`, {
      headers,
    });

    const retrieveData: BasicResponse<T> = {
      body: response.data,
    };

    return retrieveData;
  } catch (err: any) {
    throw new Error(err);
  }
};

export const POST = async <T>(context: Context): Promise<BasicResponse<T>> => {
  const { headers, path, body } = context.data
  const response = await context.instance.post(`${path}`, body, {
    headers: headers ?? defaultHeaders,
  });
  const { data } = response;
  return { body: data };
};