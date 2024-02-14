import { convertValueType } from "../utils.mts";
import { ERRORS } from "../../errors.mts";

describe("1. Illegal Inputs", () => {
  [
    // 1. Undefined
    undefined,
    // 2. Null
    null,
    // ... Other primitive and complex types
    0,
    1,
    -1,
    2,
    -2,
    true,
    false,
    {},
  ].forEach((input, index) => {
    it(`${(index + 1).toString()} - ${typeof input}`, () => {
      expect(() => convertValueType(input as unknown as string)).toThrow(
        ERRORS.UNSUPPORTED_TYPE,
      );
    });
  });
});

describe("2. Legal Inputs", () => {
  describe("Stringified Numbers", () => {
    [
      // 1. Possible edge cases
      0, 1,
      // 2. Arbitrary positive integers
      2, 3, 10, 101, 1001, 10001,
      // 3. Arbitrary negative integers
      -1, -2, -10, -102,
      // 4. Arbitrary positive floats
      1.1, 2.123, 343.32, 246454.22, 39598734359.1,
      // 5. Arbitrary negative floats
      -1.1, -2.123, -343.32, -246454.22, -39598734359.1,
    ].forEach((expected) => {
      const param = expected.toString();
      it(param, () => {
        const response = convertValueType(param);
        expect(response).toBe(expected);
      });
    });
  });

  describe("Booleans of various casings", () => {
    [
      { param: "TRUE", expected: true },
      { param: "tRUE", expected: true },
      { param: "TrUE", expected: true },
      { param: "trUE", expected: true },
      { param: "TRuE", expected: true },
      { param: "tRuE", expected: true },
      { param: "TruE", expected: true },
      { param: "truE", expected: true },
      { param: "TRUe", expected: true },
      { param: "tRUe", expected: true },
      { param: "TrUe", expected: true },
      { param: "trUe", expected: true },
      { param: "TRue", expected: true },
      { param: "tRue", expected: true },
      { param: "True", expected: true },
      { param: "true", expected: true },
      { param: "FALSE", expected: false },
      { param: "fALSE", expected: false },
      { param: "FaLSE", expected: false },
      { param: "faLSE", expected: false },
      { param: "FAlSE", expected: false },
      { param: "fAlSE", expected: false },
      { param: "FalSE", expected: false },
      { param: "falSE", expected: false },
      { param: "FALsE", expected: false },
      { param: "fALsE", expected: false },
      { param: "FaLsE", expected: false },
      { param: "faLsE", expected: false },
      { param: "FAlsE", expected: false },
      { param: "fAlsE", expected: false },
      { param: "FalsE", expected: false },
      { param: "falsE", expected: false },
      { param: "FALSe", expected: false },
      { param: "fALSe", expected: false },
      { param: "FaLSe", expected: false },
      { param: "faLSe", expected: false },
      { param: "FAlSe", expected: false },
      { param: "fAlSe", expected: false },
      { param: "FalSe", expected: false },
      { param: "falSe", expected: false },
      { param: "FALse", expected: false },
      { param: "fALse", expected: false },
      { param: "FaLse", expected: false },
      { param: "faLse", expected: false },
      { param: "FAlse", expected: false },
      { param: "fAlse", expected: false },
      { param: "False", expected: false },
      { param: "false", expected: false },
    ].forEach(({ param, expected }) => {
      it(`${param} => ${expected ? "true" : "false"}`, () => {
        const response = convertValueType(param);
        expect(response).toBe(expected);
      });
    });
  });

  describe("Strings of arbitrary lengths and characters", () => {
    [
      "jo0ky0MudPt",
      "2AKeA2gcCExeaFJEi_FNlC5",
      "bo07IlebNu2bnMJNAmlsBYZlnB6qbj q5xxAq1KejJEeG5G_qwVDGYnH-eCA_6LE8e2bQ55N7Ba",
      "b5avKYmEHJz9",
      "lOXeSrEItQ-a4qUF7MCfogzj9AeiPCA0uEKfqdVdsHwdnKfTa9Uo1fuQP",
      "1ZTdcEaUbSoW2E1c66STUvieHP49OZ RDD0sHxSP1d3flubJCXJ6aZu8vBI-IFp",
      "ie6aqcCvduiGNIv4onnS-6gLGG1gyvBtoNTIaY1j8Gpty5f-KDTpGRG",
      "9auhYHpSCTCdUCFWb_NVrOmNlVljFjpohnOQ 5CBjUsHiC",
      " ZdT2aNWIKhghr7ehnqGGyz _9vmntLu7",
      "glCY5V7ulJpGHl0T0L8a THrn_23Ovh7Fp",
      "KrsjgDtFklLpMXG SEMNG1aDnUQe-gZX5wyIUlSnnNllfhKKtxHO ugcJpxGvIyZNdFiZUYk2hKLTr-CrwNnEDyxB6nX1Z",
      "wrOwGa7XAFXlMcBqY 3KWrEtIQar5CYvGPvfoDPZtw",
      "r_0Zr2yUehD42AxIo2zL_7IPEDtXZXFCmSUk13ViTOhXGWXwLV6tvp3n60iXrdSh9AXSKNybvYkz",
      "e49g ERNt2nTTmcyMBy8CgrCc_ZQRZ2LgU CgzCV_ZNVtwzJuQi",
      "StCl8PnH9qN_h-D",
      "BNtC19oiTW-L5DnnJ3ZMT6Uy0-pUS32gkMCShO2XfVv9UL13P4MLPFCD7XCVM72Yj K7ch9mWV5zb",
      "yPE3H8h4B8VRBoAejm85UjACKF6bOUpuK90WVxwSgBahVFgcv",
      "EjsjAimFwvTV0687t_qjdXOMPZMOnyB762DwMwi3 Qwe8g5UwD-vaUI Ld1ONocFMEkX7TE uxUXVJ20nxe9U4aGSDFBn",
      "hkg8V7iUpZaQjuRWK1Bj-e4PsCx-0aGVD8F9s6pkpqEuUiUP9Qd07HS-QnZiDA9SBakayDcSTsl2YcHIB",
      "sm SBVzZGN5g_9AexN5r206yeBn_ZFTEUGAWfG muOeZl4zZ_hVaFAJ0qsbLiYNqM1RuXFz7vD-im5rS5",
      "MscEo5V2ZEhmF SafuSdJIEUiEdh",
      "TdYKAlBfnFaC5ZVZhpIjwV-OrUIv3fS8bGkOljULRH76YnVrogvuLakHPaGQlunVFzeF0uBnr676Tu7zH9QC5EOkC",
      "X7apK7h_L",
      "sh1A714qhaiSBS5DWWIEVRI_XNAZTnOGBivAuONdW9NgAvbH8L0DzjZ0l04JmugDLPzc8V",
      "bp0GzL",
      "iblCA45evT0y-zhdTyfHI8Gu wMiURR-l f2QRcO0CW5jKCrWUkRhfkGECC DbhNkrfzgX31Ir0V8XNKKRey6FVsMbgyLUZc",
      "YvkrXHsCUHUlg5bbmfMswPPsSSpAlRtyZicA_ZbMdQ22jsDLgZROra_SPz F",
      "8v4f6ppdRBgCaz40 2pQnE564Qf_je-_96ZUQ",
      "TSBoj44BOEftZ kNfIdPlOaKxUlHzaw9jmJi",
      "9piLA8aoBlEWzFV0aKnHYHcxPijkvlBQ_CggFRQ",
      "C8amf3ZzzzIuROpjp6qHnnknTAoojlsQ7dkVwRoQB46js-K7",
      "6ZOE2fYucrvokgF",
      "tb APi_lAt6qvoh8qRFAqc1tw1APe- Yk3ZtQ8NbEbSIonCCQk3OtA5RJQQWdtAhb-KGhRdDDkSUpMEPLBdDdoKScEJEfBgKGs-",
      "RT2NAgsRzLx08pa6qFMaB rlG4oyRfZ 1-Zs-plQh_cM2q YI5Y01v3-veJXgqRvTiHY9br ",
      "OVxlO2YDh6mxejIWUeEgS7cAwPAHjjKXpDOsbOFVveV5vs9",
      "rDWp",
      "1AiSGBCJ7wlg4BwIr688CKCj4trGwYXtR9lpo8XqAmB4zB",
      "nDXCemVFqXrplElbSEn43FBMR2C0nE9",
      "u1cLh8ls9zeMdmfzSYvhS28SOq0JLxguRdDquuZPc6VPqWPRnCywwE",
      "bUiDkN77NtBRP2Sy",
      " ai3EMhR02dPgqZ_aUGWyd4zu4QCB-G5pMm02K8e_vwW4x4c1NvlojSLec8UGZzn8J Jq-NWXYF",
      "WAPyWGQV1U4vxP5BQbd ij_AXyqXcXv4glD3chR0xGljN",
      "a8TTA6qI5wYOlfyFdyldku2WrA6D9MdBTbxb1rNLPsZb6OMRyTlMahlnoXRmIh5sHLKR",
      "-ZAv 29P1 NXBIy2UKZHCW5SBoISiLjd3XSVOnlLyNcaYdrEJ2EJHFS5DCSHxwYiXomRbmGIS-k2rVr4xAqm5AZlT",
      "C",
      "aaU4ZXqyCpyJS6yRfq-HryOT0c70AOki0Ksmhhiy_q67kFPybn1cwYT9xaErdMV7LvxnJqWBxrRS9Aaz",
      "Lli1fJiCMRw y",
      "uOqnjQ7bYsZ8DCb1FfbT8OF7z3UBLfXV_dKO-6GJhIjUo70gpCVChdLRkX-4jIGqSYFufXgkxiFodAphPOAwz",
      "053Fjt7dUBn6zTE8Hn9jMYrJJnrepNGgL5eR1_ctMn3hsVxIqFTmfHBWjsUpFEnhf8kvV_VdAV_ aXw5nB8ING6rVLQUfPuI",
      "XRM9qHM7dyb957cHfsmMAEVt4p6ZSe4NTD tmIjlh0FXIGG7l FcGGveqU29ByMMnlevDcL0ciXA0EFwl_-KdgDfZ",
      "Wxgk1H6oZCu",
      "lxm2gEo6CI3arvrBsR-z_AuZ8tf1L0C9jc8",
      "s7wU7lDcR8Obon4TrsUZQLdS_wrm_hFvPdluwdumOviPooQ2Iu gjm",
      "FdJwta9hhXqKFj9cjl4mNMVfhgun58owiGbHpwHrC9EqQb",
      "zHXKyX_B78 TqRSCo9a3GUa74lNTCzKeMUHeSnsILOUJcON1gMi1kYl4QdmPRfUPkObHa66p",
      "S4T ",
      "gFv1dbVG0mjGLAxPL0gqaWAH",
      "6p-dwph_lnbzVTJnjrR9MmzUrYcSqs5DLQVprhHLA3wUVmPdqOePVTC9TXrr voVg0d9eTa3GhuTZ8ddw-ipF54f2bl0v",
      "4-XOdKZT4Dt_femu",
      "Mxqqfl8fjOyosmg1 ow-gTRDcRqQ5pcF8Sbw",
      "A4t8Yc6vO7tSBQTL8U2WHVzN",
      "FwQ",
      "ODM1SPbkQ3eLmK-chMSOmiXObadV834vZl527 c01tfoI3SweRa ePPmmlEKovYJrZuVY0dnw8jJt LzQ9Ah4AMxpqgKl",
      "Bjm31jZ4IGG_R5jaBhCEVe0HIqmWSYUMFje7ga8fglshHstvQaca8JaltWg2l7sDTvw51Zl4CxrMRFw71AgQyfaUeX9tZC",
      "-iFwRivpyRNg JH_B2sBLKIPkfctufYkugpQfK3RstXw4OYGVQy_",
      "H9RdGtym-tUHqeAPqU0untPcAZog-5Ihtdhat DDLgwjj0Q_t-QCUBElfLqW2YuHr8-",
      "uhVtAh6pQxtqZoAG4wcMvisnpao30PxYyUsyF8oy4 n2Ste",
      "CesBgW7Ff9GZK4h3lG0VM67_EOXCO_9nqi84BUnl LDFLOXFLHrQJzA2qhI-p8wRR-Xt6IUl",
      "CKFjdKbbSvUiDX_nZpwB140F8baXt1tPe944-xQZyWKlnBupq x",
      "--A2cdeXbxg6hrMUB0-nETnV7k9GWOAvzqyRssEVn-gOaeiQ0PEfeMNzJZmt-tAdt",
      "AN17K139P0Vqqk5F0",
      "8PM2Lm_wf9m8 ANvYvBDR6F916V4sCXWiNvTUtumMkKENm6ZhrUEhZ K32tiSckhcn",
      "",
      "tCqbUSBN_CRPlbSoiYeIjSFE4Jhj6hpJWf_ZZM8ioYfps3swBLt4JGFtwD9uKpk",
      "hYbUccgrXOHHuRm2Usfxh",
      "HoYeZMa4Lj6lMHg ubww2qFwzRlDMyq4KHbJNs49XP6CiyG_ kCO24k5IE9g-HeXew6Y0FGqNTqovY",
      "RIgXR6wRRlZLCdgPjYRJa9GtGz99s_TBDTXgH",
      "_nbyxcYYqMAtEU5gDvrj0b47l6n6i3CPEs4VZLVnSkliKlN Y_lDa5xKbvVApvVWOh",
      "CdCnb2slq6QylPK4LhHN h0J CHswRwydJ5xE6SFW3ouUZczX6pg7YlcwWhUCl8",
      "0lMA_TNYthPFI6O1yZhFldGHW-Oap7q",
      "kmmgHITY_UkLndjHHPgmP1zJXDTxS8UV9UFIof3bUKpSdgoOucXU0R3EhyhIdmpVL1D",
      "Jmew5UajZguo__eJuAx84Ee5TUx FX0YGftMYqmS8VJ6ZVwwvkogft1E SUvSWlZIQ8OTzk8gKVUJc",
      "i2J vOkSHzmQTL1WjdvGmYn8m",
      "QbQgrMIjJn2U-QpK55DLDa8ttYnRi4UIqvw_MakCtRX7wt",
      "WTH5-3NPbwqIPAFXY1Z7h6KeVzUl1jP-TjM7tx_DaRFs_6Pmw528inB",
      "jM5PgJpWlc3MCfLS750Y8dp5q0q795AXT2PRutEZ4q",
      "WZfn9VBJo11_8Jwx9lZwwUgjAR5Q77dHyF3a",
      "y4bs3wbauXHzVBDPue27_fw13IZrx0Jw7IUClFlupJDFVVWPJ2kn7Ze7P0RPL9Zw63ItNQYuxI0WiFJj2gyC_OjEJ",
      "",
      "gYJqY-hVTnrHoHy3MIG",
      "eVHaIij-Ui59_BNLyou-a4q41WybEutV_hTKoBgrsgFMaypT11ooeYp34zQJaiixA5 k1A",
      "s DyBygFYR_-JK6o6ZodVnjRAonT q Mrl9X_zR9tGx4UIYHY2XeoC9AY9Jdb0J1P8lAo6oA",
      "R PaIhurFHwEKw_1ItH S-niEKERRS1aYnjxDWkLdcEy8wfnLJp0p0J4Kv7 Uv79VJ4RX DQ8u3KeHWfuWNhqJCD9TlG0_S",
      "zqXYobUc-AIZ9QjgUgVt8v4IIFJTCnyQ2khwtqRcbTLfof4L0owCidnWFVA_bicrlaygF5lE",
      "EOjfFSlWWPZw9F9dE1Q5l7q8fBURtd6dTbEijVMJPUlZs4uJlMaLbSlHWI3L2UbR_HlB1VSpmy",
      "brb QYBCNqo0qECGHP3M_k2eCXZ2ZH g_tRCwRxIds50zBevfcsb4_B1NEeGNoElX2Kl8nfaGExtC",
      "f7TIr",
      "HzvaBrZ4-MzqH_Ql2oF3Q1zVcgsvafhu6vLzYDNny5HpErsBQNE0ZDoBp-nurRG",
      "fKM8ybIgCwzqeHC56AZAvF1hCDYVBWRnRgVkSIzWF-9ndBEyGGUE-_AasC1HmR9z",
      "BLkW5JbQhny0U14ZFcsR",
    ].forEach((param) => {
      it(param, () => {
        const response = convertValueType(param);
        expect(response).toBe(param);
      });
    });
  });
});
