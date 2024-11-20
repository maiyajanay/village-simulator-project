import { useState } from "react";
import { Map } from "./Map";
import { ResourceView } from "./ResourcesView";
import { Resource } from "../Models/Resource";
import { Improvement } from "../Models/Improvement";
import "../StyleSheets/App.css";
import { ResourceLine } from "./ResourceLine";
import PersonIcon from "../assets/PersonIcon.png";
import LumberIcon from "../assets/LumberIcon.png";
import GrainIcon from "../assets/GrainIcon.png";
import WaterIcon from "../assets/WaterIcon.png";
import SheepIcon from "../assets/SheepIcon.png";

export function App() {
  const [resources, setResources] = useState<Resource[]>([
    {
      icon: PersonIcon,
      type: "People",
      amount: 5,
    },
    {
      icon: LumberIcon,
      type: "Lumber",
      amount: 5,
    },
    {
      icon: GrainIcon,
      type: "Grain",
      amount: 5,
    },
    {
      icon: WaterIcon,
      type: "Water",
      amount: 5,
    },
    {
      icon: SheepIcon,
      type: "Sheep",
      amount: 1,
    },
  ]);
  const [improvements, setImprovements] = useState<ImprovementOption[]>([]);

  function handleAdd(chosenImprovement: ImprovementOption, index: number) {
    const enoughResources = resources.every((resource) => {
      const costIndex = chosenImprovement.cost.findIndex(
        (cost) => cost.type === resource.type
      );
      return (
        costIndex === -1 ||
        resource.amount >= chosenImprovement.cost[costIndex].quantity
      );
    });

    if (enoughResources) {
      handleCost(chosenImprovement);
      handleBenefits(chosenImprovement);
      setImprovements((prevImprovement) => {
        const updatedImprovements = [...prevImprovement];
        updatedImprovements[index] = chosenImprovement;
        return updatedImprovements;
      });
    } else {
      console.log("Not enough Resources to build");
    }
  }

  function handleCost(chosenImprovement: ImprovementOption) {
    const enoughResources = resources.every((resource) => {
      const costIndex = chosenImprovement.cost.findIndex(
        (cost) => cost.type === resource.type
      );
      return (
        costIndex === -1 ||
        resource.amount >= chosenImprovement.cost[costIndex].quantity
      );
    });
    if (enoughResources) {
      setResources((prevResources) => {
        const updatedResources = [...prevResources];

        if (chosenImprovement.improvement === "House") {
          console.log(updatedResources[1].amount);
          console.log(chosenImprovement.cost[0].quantity);
          updatedResources[1].amount -= chosenImprovement.cost[0].quantity;
          updatedResources[2].amount -= chosenImprovement.cost[1].quantity;
          updatedResources[3].amount -= chosenImprovement.cost[2].quantity;
          updatedResources[4].amount -= chosenImprovement.cost[3].quantity;
        } else if (chosenImprovement.improvement === "Field") {
          updatedResources[0].amount -= chosenImprovement.cost[0].quantity;
          updatedResources[3].amount -= chosenImprovement.cost[1].quantity;
        } else if (chosenImprovement.improvement === "Pasture") {
          updatedResources[0].amount -= chosenImprovement.cost[0].quantity;
          updatedResources[2].amount -= chosenImprovement.cost[1].quantity;
          updatedResources[3].amount -= chosenImprovement.cost[2].quantity;
        } else if (chosenImprovement.improvement === "Lumber Mill") {
          updatedResources[0].amount -= chosenImprovement.cost[0].quantity;
        } else if (chosenImprovement.improvement === "Well") {
          updatedResources[0].amount -= chosenImprovement.cost[0].quantity;
          updatedResources[1].amount -= chosenImprovement.cost[1].quantity;
        }
        return updatedResources;
      });
    } else {
      console.log("Not enough Resources to upgrade");
      chosenImprovement.level--;
    }
  }
  function handleBenefits(chosenImprovement: ImprovementOption) {
    setResources((prevResources) => {
      const updatedResources = [...prevResources];
      if (chosenImprovement.improvement === "House") {
        updatedResources[0].amount +=
          chosenImprovement.resourcesProduced.quantity;
      } else if (chosenImprovement.improvement === "Field") {
        updatedResources[2].amount +=
          chosenImprovement.resourcesProduced.quantity;
      } else if (chosenImprovement.improvement === "Pasture") {
        updatedResources[4].amount +=
          chosenImprovement.resourcesProduced.quantity;
      } else if (chosenImprovement.improvement === "Lumber Mill") {
        updatedResources[1].amount +=
          chosenImprovement.resourcesProduced.quantity;
      } else if (chosenImprovement.improvement === "Well") {
        updatedResources[3].amount +=
          chosenImprovement.resourcesProduced.quantity;
      }
      return updatedResources;
    });
  }
  function handleCostReturn(chosenImprovement: ImprovementOption) {
    setResources((prevResources) => {
      const updatedResources = [...prevResources];

      if (chosenImprovement.improvement === "House") {
        updatedResources[1].amount += chosenImprovement.cost[0].quantity;
        updatedResources[2].amount += chosenImprovement.cost[1].quantity;
        updatedResources[3].amount += chosenImprovement.cost[2].quantity;
        updatedResources[4].amount += chosenImprovement.cost[3].quantity;
      } else if (chosenImprovement.improvement === "Field") {
        updatedResources[0].amount += chosenImprovement.cost[0].quantity;
        updatedResources[3].amount += chosenImprovement.cost[1].quantity;
      } else if (chosenImprovement.improvement === "Pasture") {
        updatedResources[0].amount += chosenImprovement.cost[0].quantity;
        updatedResources[2].amount += chosenImprovement.cost[1].quantity;
        updatedResources[3].amount += chosenImprovement.cost[2].quantity;
      } else if (chosenImprovement.improvement === "Lumber Mill") {
        updatedResources[0].amount += chosenImprovement.cost[0].quantity;
      } else if (chosenImprovement.improvement === "Well") {
        updatedResources[0].amount += chosenImprovement.cost[0].quantity;
        updatedResources[1].amount += chosenImprovement.cost[1].quantity;
      }
      return updatedResources;
    });
  }
  function handleBenefitsReturn(chosenImprovement: ImprovementOption) {
    setResources((prevResources) => {
      const updatedResources = [...prevResources];
      if (chosenImprovement.improvement === "House") {
        updatedResources[0].amount -=
          chosenImprovement.resourcesProduced.quantity;
      } else if (chosenImprovement.improvement === "Field") {
        updatedResources[2].amount -=
          chosenImprovement.resourcesProduced.quantity;
      } else if (chosenImprovement.improvement === "Pasture") {
        updatedResources[4].amount -=
          chosenImprovement.resourcesProduced.quantity;
      } else if (chosenImprovement.improvement === "Lumber Mill") {
        updatedResources[1].amount -=
          chosenImprovement.resourcesProduced.quantity;
      } else if (chosenImprovement.improvement === "Well") {
        updatedResources[3].amount -=
          chosenImprovement.resourcesProduced.quantity;
      }
      return updatedResources;
    });
  }

  function handleUpgrade(i: number) {
    setImprovements((prevLevels) => {
      const prevLevel = prevLevels[i];
      handleCost(prevLevel);
      handleBenefits(prevLevel);
      const upgradedLevel = { ...prevLevel, level: prevLevel.level + 1 };
      return [
        ...prevLevels.slice(0, i),
        upgradedLevel,
        ...prevLevels.slice(i + 1),
      ];
    });
  }
  function handleDowngrade(i: number) {
    setImprovements((prevLevels) => {
      const prevLevel = prevLevels[i];
      if (prevLevel.level <= 1) {
        console.log(
          "you cannot downgrade any farther please remove if necessary"
        );
        return prevLevels;
      } else {
        let newLevel = {
          ...prevLevel,
          level: (prevLevel.level -= 1),
        };
        handleCostReturn(newLevel);
        handleBenefitsReturn(newLevel);
        return [
          ...prevLevels.slice(0, i),
          newLevel,
          ...prevLevels.slice(i + 1),
        ];
      }
    });
  }
  function handleRemove(i: number) {
    const chosenImprovement = improvements[i];
    if (chosenImprovement.level > 1) {
      return console.log("must downgrade to level 1 first!");
    }
    handleCostReturn(chosenImprovement);
    handleBenefitsReturn(chosenImprovement);
    setImprovements((prevImprovement) => [
      ...prevImprovement.slice(0, i),
      ...prevImprovement.slice(i + 1),
    ]);
  }
  console.log(improvements);
  console.log(resources);

  return (
    <div id="MapNTAble">
      <Map
        improvements={improvements}
        OnAdd={handleAdd}
        OnUpgrade={handleUpgrade}
        OnDowngrade={handleDowngrade}
        OnRemove={handleRemove}
      />

      <ResourceView resources={resources} />
    </div>
  );
}
