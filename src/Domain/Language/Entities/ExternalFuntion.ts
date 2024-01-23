import Sequelize from "sequelize";
import sequelize from "../../../DataProviders/dataBase/VariamosORM";

export class ExternalFunction {
  id?: number;
  name?: string;
  label?: string;
  url?: string;
  header?: object;
  resulting_action?: string;
  language_id?: number;
  visible?: number;
  call_on_properties_changed?: number;

  constructor(
    id?: number,
    name?: string,
    label?: string,
    url?: string,
    header?: object,
    resulting_action?: string,
    language_id?: number,
    visible?: number,
    call_on_properties_changed?: number
  ) {
    this.id = id;
    this.name = name;
    this.label = label;
    this.url = url;
    this.header = header;
    this.resulting_action = resulting_action;
    this.language_id = language_id;
    this.visible = visible;
    this.call_on_properties_changed = call_on_properties_changed;
  }
}

export const OrmExternalFunction = sequelize.define(
  "external_function",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: { type: Sequelize.TEXT },
    label: { type: Sequelize.TEXT },
    url: { type: Sequelize.TEXT },
    header: { type: Sequelize.JSONB },
    resulting_action: { type: Sequelize.TEXT },
    language_id: { type: Sequelize.INTEGER },
    visible: { type: Sequelize.INTEGER },
    call_on_properties_changed: { type: Sequelize.INTEGER },
  },
  {
    freezeTableName: true,
    schema: "variamos",
    timestamps: false,
  }
);

export const ExternalFunctionSchema = {
  type: "object",
  properties: {
    id: { type: "number" },
    name: { type: "string" },
    label: { type: "string" },
    url: { type: "string" },
    header: { type: "object" },
    resulting_action: { type: "string" },
    language_id: { type: "number" },
    visible: { type: "number" },
    call_on_properties_changed: { type: "number" },
  },
  required: ["name", "label", "url", "resulting_action"],
  additionalProperties: false,
};
