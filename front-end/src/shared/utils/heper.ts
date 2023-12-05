export const Helper = {
  isCodeResp: (data: any): data is CodeResp => {
    return typeof data === "object" && "code" in data;
  },
};
