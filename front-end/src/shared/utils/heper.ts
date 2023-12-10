export const Helper = {
  isCodeResp: (data: any): data is CodeResp => {
    return typeof data === "object" && "code" in data;
  },
  getFullNameIcon : (fullname:string)=>{
    const words = fullname.split(' ');
    const lastName = words[words.length - 1];
    const firstLetter = lastName.charAt(0);
    return firstLetter;
  }
};
