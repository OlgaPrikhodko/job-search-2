import { Mock } from "vitest";
import axios from "axios";
vi.mock("axios");
const axiosGetMock = axios.get as Mock;

import getDegrees from "@/api/getDegrees";

describe("getDegrees", () => {
  beforeEach(() => {
    axiosGetMock.mockResolvedValue({
      data: [
        {
          id: 1,
          degree: "Associate",
        },
      ],
    });
  });

  it("fetches list of degrees", async () => {
    await getDegrees();

    expect(axios.get).toHaveBeenCalledWith("http://myfakeapi.com/degrees");
  });

  it("extracts degrees from response", async () => {
    const degrees = await getDegrees();
    expect(degrees).toEqual([{ id: 1, degree: "Associate" }]);
  });
});
