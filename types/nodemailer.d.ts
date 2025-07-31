declare module 'nodemailer' {
  interface Transporter {
    sendMail(mailOptions: any): Promise<any>
  }

  interface CreateTransporterOptions {
    service?: string
    auth?: {
      user?: string
      pass?: string
    }
  }

  function createTransporter(options: CreateTransporterOptions): Transporter

  export = {
    createTransporter
  }
} 