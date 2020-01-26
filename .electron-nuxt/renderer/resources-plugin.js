/* globals INCLUDE_RESOURCES_PATH */
/* eslint-disable */
import Vue from "vue";

/**
 * Set `__resources` path to resources files in renderer process
 */
global.__resources = undefined;
// noinspection BadExpressionStatementJS
INCLUDE_RESOURCES_PATH;
if (__resources === undefined) console.error("[Renderer-process]: Resources path is undefined");

Vue.prototype.__resources = __resources;
