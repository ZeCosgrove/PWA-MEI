import { User } from '../../user/entities/user.entity'
import { HelpSystemState } from '../enums/help-system-state.enum'

export class Help {
    subject: string
    message: string
    date: Date
    sender: User
    receiver: User
    systemState: HelpSystemState
}
