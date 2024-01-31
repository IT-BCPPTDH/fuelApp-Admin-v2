import React, { useState } from "react";
import {
  makeStyles,
  shorthands,
  Button,
  Caption1,
  tokens,
  Text,
} from "@fluentui/react-components";
import { MoreHorizontal20Regular } from "@fluentui/react-icons";
import {
  Card,
  CardHeader,
  CardPreview,
  // CardProps,
} from "@fluentui/react-components";


const useStyles = makeStyles({
  main: {
    ...shorthands.gap("16px"),
    display: "flex",
    flexWrap: "wrap",
    alignItems: "stretch",
  },

  card: {
    width: "200px",
    height: "auto",
    display:"flex",
  },

  caption: {
    fontSize: "18px",
    textAlign: "right",
  },
});

const CardExample = () => {
  const styles = useStyles();
  const datacard = [
    {
      label: "Total Hauling",
      jumlah: 757,
      satuan: "Ton",
      grid:"col-4",
    },
    {
      label: "Hauling To Hopper",
      jumlah: 757,
      satuan: "Ton",
    },
    {
      label: "Hauling To OverFlow",
      jumlah: 757,
      satuan: "Ton",
    },
    {
      label: "Hauling To ECF",
      jumlah: 757,
      satuan: "Ton",
    },
    {
      label: "Hauling To MiddleStock",
      jumlah: 757,
      satuan: "Ton",
    },
    {
      label: "Hauling To Sekurau",
      jumlah: 757,
      satuan: "Ton",
    },
  ];

  return (
    <>
      {datacard.map((v, i) => (
        <Card className={styles.card}>
          <CardHeader
            header={<Text align="end">{v.label}</Text>}
            description={
              <Caption1 width="semibold" className={styles.caption}>
                <b>
                  {v.jumlah}
                  {v.satuan}
                </b>
              </Caption1>
            }
          />
        </Card>
      ))}
    </>
  );
};

export const Selectable = () => {
  const styles = useStyles();

  const [selected1, setSelected1] = useState(false);

  return (
    <>
      <p>
        <small>View Data</small>
      </p>
      <div className="form-wrapper">
        <div className={styles.main}>
          <CardExample
            selected={selected1}
            onSelectionChange={(_, { selected }) => setSelected1(selected)}
          />

        </div>
      </div>
    </>
  );
};
