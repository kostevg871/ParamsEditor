import { useState } from "react";
import "./App.css";

interface Param {
  id: number;
  name: string;
  type: "string" | "number" | "list";
}

interface Model {
  paramsValues: ParamsValue[];
}

interface ParamsValue {
  paramid: number;
  value: string | number | string[];
}

interface Props {
  params: Param[];
  model: Model;
}

const params: Param[] = [
  { id: 1, name: "Назначение", type: "string" },
  { id: 2, name: "Длина", type: "string" },
  { id: 3, name: "Стоимость", type: "number" },
  { id: 4, name: "Список фильтров", type: "list" },
];

const model: Model = {
  paramsValues: [
    { paramid: 1, value: "повседневное228" },
    { paramid: 2, value: "макси" },
  ],
};

const ComponentParamEditor = ({ model, params }: Props) => {
  const [paramsValues, setParamsValues] = useState(model.paramsValues);

  const getValueByType = (value: string, type: Param["type"]) => {
    switch (type) {
      case "number":
        return isNaN(+value) ? value : +value;
      case "list":
        return value.split(",");
      case "string":
        return value;
      default:
        return value;
    }
  };

  const changeParamsValuesHandler =
    (id: number, type: Param["type"]) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const changedParamValueIndex = paramsValues.findIndex(
        (el) => el.paramid === id
      );
      const newParamsValue = [...paramsValues];

      if (changedParamValueIndex === -1) {
        newParamsValue.push({
          paramid: id,
          value: getValueByType(e.target.value, type),
        });
      } else {
        newParamsValue.splice(changedParamValueIndex, 1, {
          paramid: id,
          value: getValueByType(e.target.value, type),
        });
      }
      setParamsValues(newParamsValue);
    };

  const getModel = () => ({ paramsValues });

  return (
    <div>
      {params.map(({ id, name, type }) => {
        const paramValue = paramsValues.find(({ paramid }) => paramid === id);
        return (
          <div key={id}>
            <span>{name}</span>
            <input
              value={paramValue?.value ?? ""}
              onChange={changeParamsValuesHandler(id, type)}
            />
          </div>
        );
      })}
    </div>
  );
};

function App() {
  return <ComponentParamEditor model={model} params={params} />;
}

export default App;
