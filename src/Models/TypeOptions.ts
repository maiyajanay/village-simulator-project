

type ResourceType = "Person" | "Lumber" | "Grain" | "Sheep" | "Water";

type ResourceCost = {
    quantity: number;
    type: ResourceType;
  };
  
interface ImprovementOption {

  icon: string;
  improvement: string;
  level: number;
  resourcesProduced: {
    quantity: number;
    type: ResourceType;
  };
  cost: ResourceCost [];
}

