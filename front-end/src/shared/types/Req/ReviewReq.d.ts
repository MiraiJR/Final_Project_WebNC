type  GradeReviewReq = {
    structureId: number;
    expectPercentScore: number;
    explain: string;
}

type CommentGradeReviewReq = {
    content: string;
}