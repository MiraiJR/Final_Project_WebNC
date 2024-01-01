

export class AdminClassResponseDto{
    title: string;
    creator: {
        id : number,
        fullname : string,
        email: string,
    };
    created_at: Date;
    idCode: string;
    description: string;
    isActive: boolean;
}