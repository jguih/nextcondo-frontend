import { Locale } from "@/i18n-config";
import { getDictionary } from "@/src/features/localization/get-dictionary";
import {
  ActionAddOccurrenceAsync,
  ActionDeleteOccurrenceAsync,
  ActionEditOccurrenceAsync,
} from "@/src/features/page/occurrences/actions";
import { FetchClientResponse } from "@/src/lib/fetchClient/types";
import { IOccurrencesService } from "@/src/services/nextcondo/occurrences/IOccurrencesService";
import { AddOccurrenceResponseDto } from "@/src/services/nextcondo/occurrences/schemas";

const revalidatePath = jest.fn();

describe("Occurrences server actions", () => {
  it("delete occurrence returns 'success' message on 200", async () => {
    // Arrange
    const lang: Locale = "en";
    const deleteAsync: IOccurrencesService["DeleteAsync"] = async () => {
      return {
        success: true,
        hasData: false,
        method: "DELETE",
        url: process.env.NEXTCONDO_BACKEND_URL!,
        response: { statusCode: 200 },
      };
    };
    const d = await getDictionary(lang);
    const occurrenceId = "123";

    // Act
    const { result, message } = await ActionDeleteOccurrenceAsync(
      occurrenceId,
      lang,
      deleteAsync,
      revalidatePath
    );

    // Assert
    expect(result.success).toBeTruthy();
    expect(result.response).toBeTruthy();
    expect(revalidatePath).toHaveBeenCalledWith(`/occurrences/${occurrenceId}`);
    expect(revalidatePath).toHaveBeenCalledWith(`/occurrences`);
    expect(result.response?.statusCode).toBe(200);
    expect(message).toBe(
      d.page["occurrences/[id]"].succeeded_delete_occurrence
    );
  });

  it("delete occurrence returns 'unauthorized' message on 401", async () => {
    // Arrange
    const lang: Locale = "en";
    const deleteAsync: IOccurrencesService["DeleteAsync"] = async () => {
      return {
        success: false,
        hasData: false,
        method: "DELETE",
        url: process.env.NEXTCONDO_BACKEND_URL!,
        response: { statusCode: 401 },
      };
    };
    const d = await getDictionary(lang);

    // Act
    const { result, message } = await ActionDeleteOccurrenceAsync(
      "",
      lang,
      deleteAsync,
      revalidatePath
    );

    // Assert
    expect(result.success).toBeFalsy();
    expect(result.response).toBeTruthy();
    expect(result.response?.statusCode).toBe(401);
    expect(message).toBe(d.error.not_authorized_to_perform_action);
  });

  it("delete occurrence returns 'not found' message on 404", async () => {
    // Arrange
    const lang: Locale = "en";
    const deleteAsync: IOccurrencesService["DeleteAsync"] = async () => {
      return {
        success: false,
        hasData: false,
        method: "DELETE",
        url: process.env.NEXTCONDO_BACKEND_URL!,
        response: { statusCode: 404 },
      };
    };
    const d = await getDictionary(lang);

    // Act
    const { result, message } = await ActionDeleteOccurrenceAsync(
      "",
      lang,
      deleteAsync,
      revalidatePath
    );

    // Assert
    expect(result.success).toBeFalsy();
    expect(result.response).toBeTruthy();
    expect(result.response?.statusCode).toBe(404);
    expect(message).toBe(d.error.occurrence_not_found);
  });

  it("delete occurrence returns 'no response' message", async () => {
    // Arrange
    const lang: Locale = "en";
    const deleteAsync: IOccurrencesService["DeleteAsync"] = async () => {
      return {
        success: false,
        hasData: false,
        method: "DELETE",
        url: process.env.NEXTCONDO_BACKEND_URL!,
      };
    };
    const d = await getDictionary(lang);

    // Act
    const { result, message } = await ActionDeleteOccurrenceAsync(
      "",
      lang,
      deleteAsync,
      revalidatePath
    );

    // Assert
    expect(result.success).toBeFalsy();
    expect(result.response).toBeFalsy();
    expect(message).toBe(d.error.failed_to_stablish_connection_with_server);
  });

  it("delete occurrence returns 'unknown error' message on unhandled response error", async () => {
    // Arrange
    const lang: Locale = "en";
    const deleteAsync: IOccurrencesService["DeleteAsync"] = async () => {
      return {
        success: false,
        hasData: false,
        method: "DELETE",
        url: process.env.NEXTCONDO_BACKEND_URL!,
        response: { statusCode: 405 },
      };
    };
    const d = await getDictionary(lang);

    // Act
    const { result, message } = await ActionDeleteOccurrenceAsync(
      "",
      lang,
      deleteAsync,
      revalidatePath
    );

    // Assert
    expect(result.success).toBeFalsy();
    expect(result.response).toBeTruthy();
    expect(message).toBe(d.error.generic);
  });

  it("add occurrence returns 'success' message on 201", async () => {
    // Arrange
    const lang: Locale = "en";
    const fetchResponse: FetchClientResponse<AddOccurrenceResponseDto> = {
      success: true,
      hasData: true,
      method: "POST",
      url: process.env.NEXTCONDO_BACKEND_URL!,
      response: { statusCode: 201, data: { id: "123" } },
    };
    const addAsync: IOccurrencesService["AddAsync"] = async () => {
      return { ...fetchResponse };
    };
    const d = await getDictionary(lang);

    // Act
    const { result, message } = await ActionAddOccurrenceAsync(
      new FormData(),
      lang,
      addAsync,
      revalidatePath
    );

    // Assert
    expect(result.success).toBeTruthy();
    expect(result.response).toBeTruthy();
    expect(revalidatePath).toHaveBeenCalledWith(`/occurrences`);
    expect(message).toBe(d.page["occurrences/add"].succeeded_create_occurrence);
  });

  it("add occurrence returns 'not authorized' message on 401", async () => {
    // Arrange
    const lang: Locale = "en";
    const fetchResponse: FetchClientResponse<AddOccurrenceResponseDto> = {
      success: false,
      method: "POST",
      url: process.env.NEXTCONDO_BACKEND_URL!,
      response: { statusCode: 401 },
    };
    const addAsync: IOccurrencesService["AddAsync"] = async () => {
      return { ...fetchResponse };
    };
    const d = await getDictionary(lang);

    // Act
    const { result, message } = await ActionAddOccurrenceAsync(
      new FormData(),
      lang,
      addAsync,
      revalidatePath
    );

    // Assert
    expect(result.success).toBeFalsy();
    expect(result.response).toBeTruthy();
    expect(message).toBe(d.error.not_authorized_to_perform_action);
  });

  it("edit occurrence returns 'success' message on 200", async () => {
    // Arrange
    const lang: Locale = "en";
    const fetchResponse: FetchClientResponse<undefined> = {
      success: true,
      hasData: false,
      method: "POST",
      url: process.env.NEXTCONDO_BACKEND_URL!,
      response: { statusCode: 200 },
    };
    const editAsync: IOccurrencesService["EditAsync"] = async () => {
      return { ...fetchResponse };
    };
    const d = await getDictionary(lang);
    const occurrenceId = "123";
    const data: FormData = new FormData();
    data.append("id", occurrenceId);

    // Act
    const { result, message } = await ActionEditOccurrenceAsync(
      data,
      lang,
      editAsync,
      revalidatePath
    );

    // Assert
    expect(result.success).toBeTruthy();
    expect(result.response).toBeTruthy();
    expect(revalidatePath).toHaveBeenCalledWith(`/occurrences/${occurrenceId}`);
    expect(revalidatePath).toHaveBeenCalledWith(
      `/occurrences/${occurrenceId}/edit`
    );
    expect(revalidatePath).toHaveBeenCalledWith(`/occurrences`);
    expect(message).toBe(
      d.page["occurrences/[id]/edit"].succeeded_update_occurrence
    );
  });

  it("edit occurrence returns 'not authorized' message on 401", async () => {
    // Arrange
    const lang: Locale = "en";
    const fetchResponse: FetchClientResponse<undefined> = {
      success: false,
      method: "POST",
      url: process.env.NEXTCONDO_BACKEND_URL!,
      response: { statusCode: 401 },
    };
    const editAsync: IOccurrencesService["EditAsync"] = async () => {
      return { ...fetchResponse };
    };
    const d = await getDictionary(lang);
    const occurrenceId = "123";
    const data: FormData = new FormData();
    data.append("id", occurrenceId);

    // Act
    const { result, message } = await ActionEditOccurrenceAsync(
      data,
      lang,
      editAsync,
      revalidatePath
    );

    // Assert
    expect(result.success).toBeFalsy();
    expect(result.response).toBeTruthy();
    expect(message).toBe(d.error.not_authorized_to_perform_action);
  });
});
