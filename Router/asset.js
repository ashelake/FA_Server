const express = require('express');
const { Mydata } = require('../model/asset.modal');
const { MyExpense } = require('../model/expense.modal');
const { MyCapitalise } = require('../model/capital.modal');
const router = express.Router()


router.get('/', function (req, res) {
    res.send("Hello, world!")
})

router.get('/capital/:id', async function (req, res) {
    try {
        let data = await MyCapitalise.find({ _id: req.params.id })
        res.status(200).send(data)
    } catch (error) {
        res.status(200).send([])

    }

})

router.patch('/capital/:id', async function (req, res) {
    try {
        let data = await MyCapitalise.findOneAndUpdate({ _id: req.params.id }, { verified: true })
        res.status(200).send(data)
    } catch (error) {
        res.status(200).send([])

    }

})

router.post("/create", async (req, res) => {
    await Mydata.insertMany(req.body);
    res.send("Data");
});


router.get("/list", async (req, res) => {
    let data = await Mydata.find()
    res.send(data)
})
router.post("/capitalise", async (req, res) => {
    let list = req.body
    for (let i = 0; i < list.length; i++) {
        let data = await Mydata.find({ _id: list[i] })
        await MyCapitalise.insertMany(data)
        await Mydata.deleteOne({ _id: list[i] })
    }
    res.send("Successfully")
})
router.get("/capitalise", async (req, res) => {
    let data = await MyCapitalise.find({})
    res.send(data)
})
router.post("/expense", async (req, res) => {
    let list = req.body
    for (let i = 0; i < list.length; i++) {
        let data = await Mydata.find({ _id: list[i] })
        await MyExpense.insertMany(data)
        await Mydata.deleteOne({ _id: list[i] })
    }
    res.send("Successfully")
})

router.get("/expense", async (req, res) => {
    let data = await MyExpense.find({})
    res.send(data)
})
router.get("/supplier", async (req, res) => {
    let data = await Mydata.distinct("supplier_name")
    res.send(data)
})

router.get("/report", async (req, res) => {
    let data = await MyCapitalise.find({})
    let responseArray = []
    for (let i = 0; i < data.length; i++) {
        let total_cost = Number(data[i].cost) * Number(data[i].quantity)
        let total_dep = Math.floor((total_cost - (data[i].salvage_value * data[i].quantity)) / data[i].life)

        let dep = {
            asset_id: data[i].asset_id,
            asset_name: data[i].asset_name,
            nature_of_asset: data[i].nature_of_asset,
            cost_center: data[i].cost_center,
            supplier_name: data[i].supplier_name,
            location: data[i].location,
            invoice_no: data[i]?.invoice_no,
            dop: data[i].dop,
            doi: data[i].doi,
            cost: data[i].cost,
            salvage_value: data[i].salvage_value,
            life: data[i].life,
            quantity: data[i].quantity,
            user: data[i].user,
            desription: data[i]?.description,
            total_cost: total_cost,
            deletion: 0,
            gross_block: total_cost,
            open_dep: 0,
            total_dep: total_dep,
            accu_dep: total_dep,
            net_block: total_cost - total_dep,
        }
        responseArray.push(dep)
    }
    res.send(responseArray)
})


router.get("/deletion", async (req, res) => {
    let data = await MyCapitalise.find({})
    let responseArray = []
    let current_Year_start_date = new Date("2023-04-01")
    let current_Year_end_date = new Date("2024-03-31")
    function getMonthDifference(startDate, endDate) {
        return (
            endDate.getMonth() -
            startDate.getMonth() +
            12 * (endDate.getFullYear() - startDate.getFullYear())
        );
    }

    for (let i = 0; i < data.length; i++) {

        //New Asset 
        if (data[i].doi > current_Year_start_date && data[i].doi < current_Year_end_date) {
            let total_cost = Number(data[i].cost)
            let numberOfMonths = getMonthDifference(data[i].doi - current_Year_end_date)
            let total_dep_per_day = (total_cost - data[i].salvage_value) / (data[i].life * 365)
            let total_days_dep = numberOfMonths * 30 * total_dep_per_day
            let dep = {
                asset_id: data[i].asset_id,
                asset_name: data[i].asset_name,
                nature_of_asset: data[i].nature_of_asset,
                cost_center: data[i].cost_center,
                supplier_name: data[i].supplier_name,
                location: data[i].location,
                invoice_no: data[i]?.invoice_no,
                dop: data[i].dop,
                doi: data[i].doi,
                cost: data[i].cost,
                salvage_value: data[i].salvage_value,
                life: data[i].life,
                quantity: data[i].quantity,
                user: data[i].user,
                desription: data[i]?.description,
                total_cost: total_cost,
                deletion: 0,
                gross_block: total_cost,
                open_dep: 0,
                total_dep: total_days_dep,
                accu_dep: total_dep,
                net_block: total_cost - total_dep,
            }
        }

        //Asset deletion in between year
        else if (data[i].date_of_deletion < current_Year_end_date) {
            let total_cost = Number(data[i].cost)
            let numberOfMonths = getMonthDifference(data[i].date_of_deletion - current_Year_end_date)
            let total_dep_per_day = (total_cost - data[i].salvage_value) / (data[i].life * 365)
            let total_days_dep = numberOfMonths * 30 * total_dep_per_day
            let dep = {
                asset_id: data[i].asset_id,
                asset_name: data[i].asset_name,
                nature_of_asset: data[i].nature_of_asset,
                cost_center: data[i].cost_center,
                supplier_name: data[i].supplier_name,
                location: data[i].location,
                invoice_no: data[i]?.invoice_no,
                dop: data[i].dop,
                doi: data[i].doi,
                cost: data[i].cost,
                salvage_value: data[i].salvage_value,
                life: data[i].life,
                quantity: data[i].quantity,
                user: data[i].user,
                desription: data[i]?.description,
                total_cost: total_cost,
                deletion: 0,
                gross_block: total_cost,
                open_dep: 0,
                total_dep: total_days_dep,
                accu_dep: total_dep,
                net_block: total_cost - total_dep,
            }
        }
        //
        else {
            let total_cost = Number(data[i].cost)
            let numberOfMonths = getMonthDifference(data[i].date_of_deletion - current_Year_end_date)
            let total_dep_per_day = (total_cost - data[i].salvage_value) / (data[i].life * 365)
            let total_days_dep = numberOfMonths * 30 * total_dep_per_day
            let dep = {
                asset_id: data[i].asset_id,
                asset_name: data[i].asset_name,
                nature_of_asset: data[i].nature_of_asset,
                cost_center: data[i].cost_center,
                supplier_name: data[i].supplier_name,
                location: data[i].location,
                invoice_no: data[i]?.invoice_no,
                dop: data[i].dop,
                doi: data[i].doi,
                cost: data[i].cost,
                salvage_value: data[i].salvage_value,
                life: data[i].life,
                quantity: data[i].quantity,
                user: data[i].user,
                desription: data[i]?.description,
                total_cost: total_cost,
                deletion: 0,
                gross_block: total_cost,
                open_dep: 0,
                total_dep: total_days_dep,
                accu_dep: total_dep,
                net_block: total_cost - total_dep,
            }

        }

        responseArray.push(dep)
    }






    res.send(responseArray)
})


router.get("/calculation", async (req, res) => {
    let fy = Number(req.query.fy) || 2023
    let data = await MyCapitalise.find({})
    let responseArray = []
    for (let i = 0; i < data.length; i++) {
        let total_cost = Number(data[i].cost) * Number(data[i].quantity)
        let total_dep = Math.floor((total_cost - (data[i].salvage_value * data[i].quantity)) / data[i].life)


        // let purchase_date = new Date("2023-01-24")
        let purchase_date = new Date(data[i].dop)
        console.log("purchase_date", purchase_date)

        let installation_date = new Date(data[i].doi)
        // let installation_date = new Date("2023-12-09")
        console.log("installation_date", installation_date)

        let passDate = new Date(data[i].doi)
        let useful_life_months = data[i].life
        // let useful_life_months = 84
        console.log("life_months", useful_life_months)
        if (data[i]?.dod) {
            var deletion_date = new Date(data[i]?.dod)
        } else {
            var deletion_date = ""
        }
        // let deletion_date = new Date("2030-01-21")
        console.log("deletion_date", deletion_date)

        function addMonths(date, months) {
            date.setMonth(date.getMonth() + months);
            return date;
        }

        const original_life_end_date_of_depreciation = addMonths(passDate, useful_life_months);
        console.log("original_life_end_date_of_depreciation", original_life_end_date_of_depreciation)

        let Actual_life_end_date_of_depreciation;
        if (deletion_date != "" && original_life_end_date_of_depreciation > deletion_date) {
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

        let FY = fy
        console.log("FY", FY)
        let fy_start_date = new Date(`${FY}-04-01`)
        console.log("fy_start_date", fy_start_date)
        let fy_end_date = new Date(`${FY + 1}-03-31`)
        // let fy_end_date = new Date("2024-03-31")
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
        let Asset_Value_Gross = data[i].cost
        let Salvage_value = data[i].salvage_value
        let Value_for_depreciation_calculations_SLM = Asset_Value_Gross - Salvage_value
        console.log("Value_for_depreciation_calculations_SLM", Value_for_depreciation_calculations_SLM)

        let Rate = data[i].rate || 10
        let perDayDep = Value_for_depreciation_calculations_SLM * (Rate / (100 * 365))
        let Depreciation_for_the_period = Math.floor(perDayDep * fy_depreciation_days)
        // let Depreciation_for_the_period = Value_for_depreciation_calculations_SLM * (Rate / 100)
        console.log("Depreciation_for_the_period :", Depreciation_for_the_period)







        let dep = {
            asset_id: data[i].asset_id,
            asset_name: data[i].asset_name,
            nature_of_asset: data[i].nature_of_asset,
            cost_center: data[i].cost_center,
            supplier_name: data[i].supplier_name,
            location: data[i].location,
            invoice_no: data[i]?.invoice_no,
            dop: data[i].dop,
            doi: data[i].doi,
            dod: data[i]?.dod,
            cost: data[i].cost,
            rate: data[i].rate,
            salvage_value: data[i].salvage_value,
            life: data[i].life,
            quantity: data[i].quantity,
            user: data[i].user,
            desription: data[i]?.description,
            total_cost: total_cost,
            deletion: 0,
            gross_block: total_cost,
            open_dep: 0,
            total_dep: Depreciation_for_the_period,
            accu_dep: total_dep,
            net_block: total_cost - accu_dep,
        }
        responseArray.push(dep)
    }
    res.send(responseArray)
})





module.exports = router