export interface MailMessage {
  readonly to: readonly string[];
  readonly from: string;
  readonly subject: string;
  readonly html: string;
  readonly text: string;
  /** Set so that hitting "Reply" in the inbox replies to the patient. */
  readonly replyTo?: string;
}

export type MailResult =
  | { readonly ok: true; readonly id?: string }
  | { readonly ok: false; readonly error: string };

export interface Mailer {
  readonly name: string;
  send(message: MailMessage): Promise<MailResult>;
}
