

let purchase_date = new Date("2023-01-24")
console.log("purchase_date", purchase_date)

let installation_date = new Date("2023-12-09")
console.log("installation_date", installation_date)

let passDate = new Date("2023-12-09")
let useful_life_months = 84
console.log("life_months", useful_life_months)

let deletion_date = new Date("2030-01-21")
console.log("deletion_date", deletion_date)

function addMonths(date, months) {
    date.setMonth(date.getMonth() + months);
    return date;
}

const original_life_end_date_of_depreciation = addMonths(passDate, useful_life_months);
console.log("original_life_end_date_of_depreciation", original_life_end_date_of_depreciation)

let Actual_life_end_date_of_depreciation;
if (original_life_end_date_of_depreciation > deletion_date) {
    Actual_life_end_date_of_depreciation = deletion_date
} else {
    Actual_life_end_date_of_depreciation = original_life_end_date_of_depreciation
}
console.log("Actual_life_end_date_of_depreciation", Actual_life_end_date_of_depreciation)
const delta = original_life_end_date_of_depreciation.getTime() - installation_date.getTime();
let Life_depreciation_days = delta / (1000 * 60 * 60 * 24);
console.log("Life_depreciation_days :", Life_depreciation_days)
const delta_1 = Actual_life_end_date_of_depreciation.getTime() - installation_date.getTime();
let Actual_life_end_date_depreciation_days = delta_1 / (1000 * 60 * 60 * 24);
console.log("Actual_life_end_date_depreciation_days :", Actual_life_end_date_depreciation_days)


function calculateDaysBetweenDates(date1, date2) {
    const oneDay = 24 * 60 * 60 * 1000; // Number of milliseconds in a day
    const diffInDays = Math.floor((date2 - date1) / oneDay) + 1;
    return diffInDays;
}

function calculateValue(C22, installationDate, actualLifeEndDateOfDepreciation) {
    let daysDiff = (C22 !== '') ? calculateDaysBetweenDates(C22, installationDate) : calculateDaysBetweenDates(actualLifeEndDateOfDepreciation, installationDate);
    daysDiff = Math.abs(daysDiff);
    const value = (daysDiff < 0) ? 0 : daysDiff;
    return value;
}


let end_date_of_depreciation = deletion_date == "" ? Actual_life_end_date_of_depreciation : deletion_date
console.log("end_date_of_depreciation:", end_date_of_depreciation)


const delta_3 = end_date_of_depreciation.getTime() - installation_date.getTime();

let total_depreciation_days = delta_3 / (1000 * 60 * 60 * 24);
console.log("total_depreciation_days", total_depreciation_days)

let FY = 2023
console.log("FY", FY)
let fy_start_date = new Date("2023-04-01")
console.log("fy_start_date", fy_start_date)
let fy_end_date = new Date("2024-03-31")
console.log("fy_end_date", fy_end_date)

const days = FY => new Date(FY, 1, 29).getDate() === 29 ? 366 : 365;
let fy_days = days()
console.log("fy_days", fy_days)

// ................................................................
function calculateValue1(deletionDate, installationDate, fyStartDate, fyEndDate) {
    if (deletionDate !== "") {
        if (installationDate >= fyStartDate && installationDate < fyEndDate) {
            return installationDate;
        } else if (fyStartDate > deletionDate) {
            return "";
        } else if (fyStartDate > installationDate) {
            return fyStartDate;
        } else {
            return ""

        }
    } else {
        if (installationDate >= fyStartDate && installationDate < fyEndDate) {
            return installationDate;
        } else if (fyStartDate > installationDate) {
            return fyStartDate;
        } else {
            return ""
        }
    }
}

const deprn_start_date = calculateValue1(deletion_date, installation_date, fy_start_date, fy_end_date);
console.log("deprn_start_date:", deprn_start_date);
const C22 = deprn_start_date;
const installationDate = installation_date
let depreciation_days_start2date = calculateValue(C22, installationDate, Actual_life_end_date_of_depreciation);
console.log("depreciation_days_start2date :", depreciation_days_start2date);

// .......................................................
function calculateValue2(deprnStartDate, deletionDate, fyEndDate, actualLifeEndDateOfDepreciation) {
    if (deprnStartDate == "" || deprnStartDate == undefined) {
        return "";
    } else if (deletionDate !== "" && deletionDate >= deprnStartDate && deletionDate <= fyEndDate && fyEndDate <= actualLifeEndDateOfDepreciation) {
        return deletionDate;
    } else if (fyEndDate > actualLifeEndDateOfDepreciation) {
        return actualLifeEndDateOfDepreciation;
    } else {
        return fyEndDate;
    }
}



const deprn_end_date = calculateValue2(deprn_start_date, deletion_date, fy_end_date, Actual_life_end_date_of_depreciation);
console.log("deprn_end_date:", deprn_end_date);


// ............................................................................

function calculateDaysBetweenDates3(startDate, endDate) {
    const oneDay = 24 * 60 * 60 * 1000; // Number of milliseconds in a day
    const diffInDays = Math.floor((endDate - startDate) / oneDay) + 1;
    return diffInDays;
}

function calculateValue3(deprnStartDate, deprnEndDate) {
    if (deprnStartDate === "" || deprnEndDate === "") {
        return "";
    } else {
        const daysDiff = calculateDaysBetweenDates3(new Date(deprnStartDate), new Date(deprnEndDate));
        return daysDiff;
    }
}
const fy_depreciation_days = calculateValue3(deprn_start_date, deprn_end_date);
console.log("fy_depreciation_days:", fy_depreciation_days);


// ...........................................
let Asset_Value_Gross = 1235000
let Salvage_value = 73000
let Value_for_depreciation_calculations_SLM = Asset_Value_Gross - Salvage_value
console.log("Value_for_depreciation_calculations_SLM", Value_for_depreciation_calculations_SLM)

let Rate = 14
let perDayDep = Value_for_depreciation_calculations_SLM * (Rate / (100 * 365))
let Depreciation_for_the_period = perDayDep * fy_depreciation_days
console.log("Depreciation_for_the_period :", Depreciation_for_the_period)

