import { useNavigate } from "react-router-dom"
import { Button } from "@fluentui/react-components"

const FallbackUI = () => {

    const navigate = useNavigate()

    const handle = () => {
        navigate('/')
    }
    return(
        <div className="row">
            <div className="col-12">
            <div className="mt2em text-center">
            <h1>Mohon maaf halaman yang anda cari tidak ditemukan</h1>
            <Button onClick={handle}>Kembali ke Halaman Utama</Button>
            </div>
            </div>
        
            
        </div>
    )
}

export default FallbackUI