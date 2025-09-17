
export function rideDurationHours(frompincode, topincode) {

    const fromCode = parseInt(frompincode || "0", 10);
    const toCode = parseInt(topincode || "0", 10);

    if (isNaN(fromCode) || isNaN(toCode)) {
        throw new Error("Invalid pincode format");
    }

    const distance = Math.abs(fromCode - toCode);
    const duration = distance / 100; // Assuming 100 km/h average speed
    return Math.ceil(duration);
}


export function addHours(date, hours) {
    const result = new Date(date);
    result.setHours(result.getHours() + hours);
    return result;
}

