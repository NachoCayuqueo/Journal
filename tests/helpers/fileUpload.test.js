import { v2 as cloudinary } from "cloudinary";
import { fileUpload } from "../../src/helpers/fileUpload";

cloudinary.config({
  cloud_name: "dyqfpuq6f",
  api_key: "251815712746242",
  api_secret: "WlqjqjuC1LXFBWDhF49RRGFrzoQ",
  secure: true,
});

describe("Pruebas en fileUpload", () => {
  test("debe de subir el archivo correctamente a cloudinary", async () => {
    const imageUrl =
      "https://png.pngtree.com/png-clipart/20191115/ourmid/pngtree-lake-and-mountains-scene-png-image_1990796.jpg";

    const resp = await fetch(imageUrl);

    const blob = await resp.blob();
    const file = new File([blob], "foto.png");
    const url = await fileUpload(file);

    expect(typeof url).toBe("string");

    const segments = url.split("/");
    const imageId = segments[segments.length - 1].replace(".jpg", "");

    const cloudResp = await cloudinary.api.delete_resources(
      ["journal/" + imageId],
      { resource_type: "image" }
    );
    // console.log({ cloudResp });
  });

  test("debe de retornar null", async () => {
    const file = new File([], "foto.png");
    const url = await fileUpload(file);

    expect(url).toBe(null);
  });
});
