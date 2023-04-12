import EnergyPark from "../domain/EnergyPark.js";

export async function createPark(data) {
    if (data) {
        const park = await EnergyPark.create({name: data.name, address: "any", type: "1"})
        console.log("Created new Energy Park with auto-generated ID:", park.id);
        return park;
    }
}