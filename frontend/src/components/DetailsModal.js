//dependencies
import { format } from 'date-fns';

const DetailsModal = ({data, setShowDetailsModal}) => {
  return (
    <div className="modal">
      <div className="modal-content-wrapper">
        <p><b>Datum i vrijeme:</b> {format(new Date(data.date), 'dd.MM.yyyy HH:mm')}</p>
        <p><b>Rezultati kontrole:</b> {data.result}</p>
        <p><b>Naziv knotrolisanog proizvoda:</b> {data.product.name}</p>
        <p><b>Serijski broj:</b> {(data.product.serial_number) ? data.product.serial_number : '/'}</p>
        <p><b>Zemlja porijekla:</b> {data.product.country_of_origin}</p>
        <button 
          className="btn btn-details"
          onClick={() => setShowDetailsModal(false)}
        >
          Zatvori
        </button>
      </div>
    </div>
  )
}

export default DetailsModal;