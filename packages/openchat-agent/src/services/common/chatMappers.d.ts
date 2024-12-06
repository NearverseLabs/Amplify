export declare function apiOptional<D, A>(mapper: (d: D) => A, domain: D | undefined): [] | [A];
export declare function proposalVote(vote: number): boolean | undefined;
export declare function apiProposalVote(vote: boolean): number;
