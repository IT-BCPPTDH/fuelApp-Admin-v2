
import { makeStyles, Body1, shorthands } from '@fluentui/react-components'
import { Card, CardHeader } from '@fluentui/react-components'
import { InputForm } from './Input'

const { margin } = shorthands

const useStyles = makeStyles({
  card: {
    ...margin('auto'),
    width: '450px',
    backgroundColor: '#e3f3ff',
    position: 'absolute',
    left: '35%',
    top: '30%',
    boxShadow: '0 0 20px rgba(0, 0, 0, 0.2)'
  }
})
export const Loginpage = () => {
  const styles = useStyles()

  return (
    <>
      <Card className={styles.card}>
        <CardHeader
          header={
            <Body1>
              <InputForm />
            </Body1>
          }
        />
      </Card>
    </>
  )
}
