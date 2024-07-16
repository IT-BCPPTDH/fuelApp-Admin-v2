import { useNavigate } from "react-router-dom"

import { EuiButton } from '@elastic/eui';


const FallbackUI = () => {

    const navigate = useNavigate()

    const handle = () => {
        navigate('/')
    }
    return (
        <div className="row">
            <div className="col-12">
                <div className="mt2em text-center">
                    <h1>Mohon maaf halaman yang anda cari tidak ditemukan</h1>
                    <EuiButton onClick={handle}>Kembali ke Halaman Utama</EuiButton>
                </div>
            </div>
        </div>
    )
}

export default FallbackUI