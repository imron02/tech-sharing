import { render, screen, waitFor } from "@testing-library/react";
import MockAdapter from "axios-mock-adapter";
import { axiosInstance } from "./api/axios";
import App from "./App";

const mockAxios = new MockAdapter(axiosInstance);

mockAxios.onGet("/").reply(200, {
  data: "mock-words",
  status: 200,
});

test("renders without error", async () => {
  render(<App />);
  const app = screen.getByTestId("app");
  await waitFor(() => {
    expect(app).toBeInTheDocument();
  });
});

describe("get secret words", () => {
  beforeEach(() => {
    mockAxios.resetHistory();
  });

  test("getSecretWord runs on app mount", async () => {
    render(<App />);
    await waitFor(() => {
      expect(mockAxios.history.get.length).toBe(1);
    });
  });
  test("getSecretWord does not run on app update", async () => {
    const { rerender } = render(<App />);
    rerender(<App />);
    await waitFor(() => {
      expect(mockAxios.history.get.length).toBe(1);
    })
  });
});
