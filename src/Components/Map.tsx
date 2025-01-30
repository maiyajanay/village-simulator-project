import { useState } from "react";
import { Tile } from "./Tile";
import "../StyleSheets/Map.css";
import { AddImprovementDialog } from "./AddImprovementDialog";
import { EditImprovementDialog } from "./EditImprovementDialog";

import HouseIcon from "../Assets/HouseIcon.png";
import FieldIcon from "../Assets/FieldIcon.png";
import PastureIcon from "../Assets/PastureIcon.png";
import LumberMillIcon from "../Assets/LumberMillIcon.png";
import WellIcon from "../Assets/WellIcon.png";

interface MapProps {
  improvements: ImprovementOption[];
  OnAdd: (chosenImprovement: any, i: number) => void;
  OnUpgrade: (i: number) => void;
  OnDowngrade: (i: number) => void;
  OnRemove: (i: number) => void;
}
type Visibility = "visible" | "hidden";
export function Map({
  OnAdd,
  OnUpgrade,
  OnDowngrade,
  OnRemove,
  improvements,
}: MapProps) {
  const [isAddVisible, setIsAddVisible] = useState<Visibility>("hidden");
  const [isEditVisible, setIsEditVisible] = useState<Visibility>("hidden");
  const [clickedI, setClickedI] = useState<number>(0);
  const typeOptions: ImprovementOption[] = [
    {
      icon: HouseIcon,
      improvement: "House",
      level: 1,
      resourcesProduced: {
        quantity: 5,
        type: "Person",
      },
      cost: [
        {
          quantity: 5,
          type: "Lumber",
        },
        {
          quantity: 5,
          type: "Grain",
        },
        {
          quantity: 5,
          type: "Water",
        },
        {
          quantity: 1,
          type: "Sheep",
        },
      ],
    },
    {
      icon: FieldIcon,
      improvement: "Field",
      level: 1,
      resourcesProduced: {
        quantity: 10,
        type: "Grain",
      },
      cost: [
        {
          quantity: 1,
          type: "Person",
        },
        {
          quantity: 2,
          type: "Water",
        },
      ],
    },
    {
      icon: PastureIcon,
      improvement: "Pasture",
      level: 1,
      resourcesProduced: {
        quantity: 5,
        type: "Sheep",
      },
      cost: [
        {
          quantity: 1,
          type: "Person",
        },
        {
          quantity: 2,
          type: "Grain",
        },
        {
          quantity: 2,
          type: "Water",
        },
      ],
    },
    {
      icon: LumberMillIcon,
      improvement: "Lumber Mill",
      level: 1,
      resourcesProduced: {
        quantity: 10,
        type: "Lumber",
      },
      cost: [
        {
          quantity: 1,
          type: "Person",
        },
      ],
    },
    {
      icon: WellIcon,
      improvement: "Well",
      level: 1,
      resourcesProduced: {
        quantity: 10,
        type: "Water",
      },
      cost: [
        {
          quantity: 1,
          type: "Person",
        },
        {
          quantity: 2,
          type: "Lumber",
        },
      ],
    },
  ];

  const handleClick = (e: MouseEvent, i: any) => {
    if ((e.target as HTMLElement).className === "noImprovements") {
      setIsAddVisible("visible");
      setClickedI(i);
    } else {
      setIsEditVisible("visible");
      setClickedI(i);
    }
  };
  function handleSendAdd(improvement: ImprovementOption): void {
    OnAdd(improvement, clickedI);
    setIsAddVisible("hidden");
  }
  console.log(clickedI);
  return (
    <>
      <div id="map">
        {[...Array(25)].map((_, i) => (
          <Tile
            key={i}
            improvements={improvements[i]}
            OnClick={(e: MouseEvent) => handleClick(e, i)}
          />
        ))}
      </div>
      <div style={{ visibility: `${isAddVisible}` }}>
        <AddImprovementDialog
          OnAdd={handleSendAdd}
          // {(improvement) => {
          // OnAdd(improvement, clickedI), setIsAddVisible("hidden");
          // }}
          OnCancel={() => setIsAddVisible("hidden")}
          typeOptions={typeOptions}
        />
      </div>

      <div style={{ visibility: `${isEditVisible}` }}>
        <EditImprovementDialog
          OnUpgrade={() => {
            OnUpgrade(clickedI);
          }}
          OnDowngrade={() => {
            OnDowngrade(clickedI);
          }}
          OnClose={() => setIsEditVisible("hidden")}
          OnRemove={() => {
            OnRemove(clickedI), setIsEditVisible("hidden");
          }}
        />
      </div>
    </>
  );
}
