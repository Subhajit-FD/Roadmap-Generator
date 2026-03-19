const pdfParse = require("pdf-parse")
const { generateInterviewReport } = require("../services/ai.service")
const interviewReportModel = require("../models/interviewReport.model")
const userModel = require("../models/user.model")




/**
 * @description Controller to generate interview report based on user self description, resume and job description.
 */
async function generateInterViewReportController(req, res) {

    const user = await userModel.findById(req.user.id);
    const hasUnlimited = user.unlimitedExpiresAt && new Date(user.unlimitedExpiresAt) > new Date();

    if (!user || (!hasUnlimited && user.tokens <= 0)) {
        return res.status(403).json({
            message: "Insufficient tokens or expired membership to generate a new roadmap."
        });
    }

    const resumeContent = await pdfParse(req.file.buffer)
    const { selfDescription, jobDescription } = req.body

    const interViewReportByAi = await generateInterviewReport({
        resume: resumeContent.text,
        selfDescription,
        jobDescription
    })

    const interviewReport = await interviewReportModel.create({
        user: req.user.id,
        resume: resumeContent.text,
        selfDescription,
        jobDescription,
        ...interViewReportByAi
    })

    if (!hasUnlimited) {
        user.tokens -= 1;
        await user.save();
    }

    res.status(201).json({
        message: "Interview report generated successfully.",
        interviewReport
    })

}

/**
 * @description Controller to get interview report by interviewId.
 */
async function getInterviewReportByIdController(req, res) {

    const { interviewId } = req.params

    const interviewReport = await interviewReportModel.findOne({ _id: interviewId, user: req.user.id })

    if (!interviewReport) {
        return res.status(404).json({
            message: "Interview report not found."
        })
    }

    res.status(200).json({
        message: "Interview report fetched successfully.",
        interviewReport
    })
}


/** 
 * @description Controller to get all interview reports of logged in user.
 */
async function getAllInterviewReportsController(req, res) {
    const interviewReports = await interviewReportModel.find({ user: req.user.id }).sort({ createdAt: -1 }).select("-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan")

    res.status(200).json({
        message: "Interview reports fetched successfully.",
        interviewReports
    })
}


/**
 * @description Controller to delete interview report by interviewId.
 */
async function deleteInterviewReportController(req, res) {
    const { interviewId } = req.params;
    const report = await interviewReportModel.findOneAndDelete({ _id: interviewId, user: req.user.id });

    if (!report) {
        return res.status(404).json({
            message: "Report not found or already deleted."
        });
    }

    res.status(200).json({
        message: "Report deleted successfully."
    });
}




module.exports = { generateInterViewReportController, getInterviewReportByIdController, getAllInterviewReportsController, deleteInterviewReportController }