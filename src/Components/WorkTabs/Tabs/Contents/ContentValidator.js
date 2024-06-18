/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { isValidJson } from "../../../../../libs/jsonUtils/isValidJson";
import { matchJsonSchema } from "../../../../../libs/jsonUtils/videoJsonSchema";

export function isContentValid(content) {
  const result = {
    message: "",
    success: false,
  };

  const isValidJsonResult = isValidJson(content);

  if (!isValidJsonResult.success) {
    return { ...result, error: `Custom Page Error: ${isValidJsonResult.error || "Invalid JSON format"}` };
  }

  const parsedContent = JSON.parse(content);

  if (!(parsedContent instanceof Array)) {
    return { ...result, error: "Custom Page Error: VideoContent.json is not an array" };
  }

  const isSchema = matchJsonSchema(content);

  if (!isSchema.success) {
    return { ...result, error: `Custom Page Error: ${isSchema.error || "Schema validation failed"}` };
  }

  return { ...result, success: true, message: "Custom Content has been successfully uploaded" };
}
