import React from "react";
import { ModuleIdentifier, RobotModule } from "./enums";

import CameraFeed from "../components/CameraFeed";
import RobotChat from "../components/RobotChat";
import RobotFace from "../components/RobotFace/RobotFace";
import SystemHealthModule from "../components/SystemHealthModule";
import RobotModulesModule from "../components/RobotModulesModule";

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
    case ModuleIdentifier.ROBOT_MODULES:
      return <RobotModulesModule />;
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
    case ModuleIdentifier.ROBOT_MODULES:
      return "Active robot modules";
    default:
      return "Unknown module";
  }
}

export function mapRobotModuleToName(robotModule) {
  switch (robotModule) {
    case RobotModule.SPEECH:
      return "Speech module";
    case RobotModule.NLU:
      return "NLU module";
    case RobotModule.NAVIGATION:
      return "Navigation module";
    case RobotModule.MAIN_ENGINE:
      return "Main engine module";
    case RobotModule.MECHANISM_CONTROL:
      return "Mechanism control module";
    case RobotModule.PERSON_RECOGNITION:
      return "Person recognition module";
    case RobotModule.OBJECT_RECOGNITION:
      return "Object recognition module";
    default:
      return "Unknown module";
  }
}
