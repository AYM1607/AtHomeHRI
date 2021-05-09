import React from "react";
import { ModuleIdentifier } from "./enums";

import CameraFeed from "../components/CameraFeed";
import RobotChat from "../components/RobotChat";
import RobotFace from "../components/RobotFace/RobotFace";
import SystemHealthModule from "../components/SystemHealthModule";

export function mapModuleIdToComponent(moduleId) {
  switch (moduleId) {
    case ModuleIdentifier.CAMERA:
      return <CameraFeed />;
    case ModuleIdentifier.CHAT:
      return <RobotChat />;
    case ModuleIdentifier.FACE:
      return <RobotFace />;
    case ModuleIdentifier.SYSTEM_HEALTH:
      // TODO: implement system health.
      return <SystemHealthModule />;
    default:
      // Return an empty div if the value is not recognized.
      return <div />;
  }
}

export function mapModuleIdToName(moduleId) {
  switch (moduleId) {
    case ModuleIdentifier.CAMERA:
      return "Camera feed";
    case ModuleIdentifier.CHAT:
      return "Robot chat";
    case ModuleIdentifier.FACE:
      return "Face";
    case ModuleIdentifier.SYSTEM_HEALTH:
      return "System health";
    default:
      return "Unknown module";
  }
}
