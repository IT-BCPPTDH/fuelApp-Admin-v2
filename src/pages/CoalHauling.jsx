import Title from "../components/Title";
import InputHauling from "../components/Hauling/InputHauling";
import CardDataHauling from "../components/Hauling/CardDataHauling";
import TableHauling from "../components/Hauling/TableHauling";

export default function CoalHauling() {
  
  return (
    <>
      <Title title="Entry Data Hauling" />
        <div className="row">
          <div className="col-7">
            <InputHauling />
          </div>
          <div className="col-5">
            <CardDataHauling />
          </div>
          <div className="col-12">
            <TableHauling />
          </div>
        </div>
    </>
  );
}
