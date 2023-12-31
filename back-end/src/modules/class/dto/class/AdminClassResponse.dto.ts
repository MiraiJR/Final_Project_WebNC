

export class AdminClassResponseDto{
    title: string;
    creator: {
        id : number,
        fullname : string,
        email: string,
    };
    create_at: string;
    idCode: string;
    description: string;
    isActive: boolean;
}