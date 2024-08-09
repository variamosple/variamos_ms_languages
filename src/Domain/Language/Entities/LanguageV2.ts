export interface Language {
  id?: number;
  name?: string;
  abstractSyntax?: JSON;
  concreteSyntax?: JSON;
  type?: string;
  stateAccept?: string;
  semantics?: JSON;
  userId?: string;
  ownerName?: string;
}
