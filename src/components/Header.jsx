import { Subtitle2, makeStyles, Image } from '@fluentui/react-components'
import Logo from '../images/dewa.png'

const useStyles = makeStyles({
  root: {
    backgroundColor: '#737c1014',
    textAlign: 'center',
    height: '48px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
})
const Header = () => {
  const styles = useStyles()
  return (
    <div
      className={styles.root}
      style={{ padding: '10px 38px', borderBottom: '1px solid #c8c8c8' }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '65px' }}>
        <Image alt='Darma Henwa' src={Logo} height={26} width={130} />
        <Subtitle2
          style={{ position: 'relative', right: '50px', color: '#555' }}
        >
          Pit Control Data Collector
        </Subtitle2>
      </div>

      <Image
        alt="Erik's avatar"
        shape='circular'
        src='https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/ErikNason.jpg'
        height={30}
        width={30}
      />
    </div>
  )
}

export default Header
