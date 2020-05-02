//icons
import { VideoLabel, FolderOpen, Replay } from '@material-ui/icons'

const scanTypesData = [
    {
        icon:   Replay,
        header: 'Quick scan',
        text:   'Quickly scans for threats in the places they are most likely to hide. If threats are found, we recommend runing a full scan afterwards for more comprehensive detection',
        recommended: true
    },
    {
        icon:   VideoLabel,
        header: 'Full scan',
        text:   'A comprehensive threat inspection of your entire computer including processes, memory, files and startups. Your computer may run a bit slow while runing this scan'
    },
    {
        icon:   FolderOpen,
        header: 'Custom scan',
        text:   'Allows you to scan specific folders on your computer or external devices. This scan looks only at files within the selected folder'
    }
]

export default scanTypesData