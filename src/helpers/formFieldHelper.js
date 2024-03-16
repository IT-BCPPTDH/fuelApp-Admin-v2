
export const timeEntryFormField = {
    formId: "TE-0001",
    site: 'BCP',
    stafEntry: 'Nama Lengkap',
    tanggal: new Date(),
    // shift: '',
    unitNo: '',
    hmAwal: '',
    hmAkhir: '',
    hm: ''
  };

  export const getShift = () =>{
    const now = new Date()
    const currentHour = now.getHours()

    let shift = ''

    if (currentHour >= 6 && currentHour < 18) {
      shift = 'Day'
    } else {
      shift = 'Night'
    }

    return shift
  }