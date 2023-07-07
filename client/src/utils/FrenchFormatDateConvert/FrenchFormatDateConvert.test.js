import FrenchFormatDateConvert from "./FrenchFormatDateConvert";

describe("FrenchFormatDateConvert", () => {
    it("should convert date to French format without time", () => {
        const date = "2023-10-23";
        const formattedDate = FrenchFormatDateConvert(date);
        expect(formattedDate).toEqual("23-10-2023");
    });

    it("should convert date with time to French format", () => {
        const dateWithTime = "2023-10-23 10:10:10";
        const formattedDate = FrenchFormatDateConvert(dateWithTime);
        expect(formattedDate).toEqual("23-10-2023 10:10:10");
    });

    it("should convert date with time and timezone to French format", () => {
        const dateWithTimeAndTimezone = "2023-10-23 10:10:10 +0000";
        const formattedDate = FrenchFormatDateConvert(dateWithTimeAndTimezone);
        expect(formattedDate).toEqual("23-10-2023 10:10:10");
    });

    // simule un déclage horaire
    //it("should convert date with time and timezone to French format with offset", () => {
    //    const dateWithTimeAndTimezone = "2023-10-23 10:10:10 +0200";
    //    const formattedDate = FrenchFormatDateConvert(dateWithTimeAndTimezone);
    //    expect(formattedDate).toEqual("23-10-2023 12:10:10");
    //});
});

// yarn test