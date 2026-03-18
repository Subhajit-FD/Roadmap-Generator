import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Activity, Clock, Trash2 } from "lucide-react";

const Dashboard = () => {
    const [reports, setReports] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const res = await axios.get("http://localhost:3000/api/interview", {
                    withCredentials: true
                });
                setReports(res.data.interviewReports || []);
            } catch (error) {
                console.error("Failed to fetch reports", error);
            } finally {
                setLoading(false);
            }
        };
        fetchReports();
    }, []);

    return (
        <div className="min-h-[80vh] py-24 px-8 pt-32 w-full max-w-6xl mx-auto flex flex-col items-start justify-start gap-8">
            <div className="space-y-4 w-full border-b border-border pb-8">
                <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase">Your Dashboard</h1>
                <p className="text-muted-foreground font-medium max-w-lg">
                    Access and review all your previously generated career reset roadmaps and interview reports.
                </p>
            </div>

            {loading ? (
                <div className="w-full h-64 flex items-center justify-center">
                    <span className="w-8 h-8 rounded-full border-4 border-primary border-t-transparent animate-spin" />
                </div>
            ) : reports.length === 0 ? (
                <div className="w-full flex flex-col items-center justify-center p-16 border border-dashed border-border text-center space-y-4 bg-secondary/10">
                    <Activity className="w-10 h-10 text-muted-foreground opacity-50" />
                    <h3 className="text-lg font-bold uppercase tracking-widest">No Roadmaps Found</h3>
                    <p className="text-sm text-muted-foreground">You haven't generated any roadmaps yet.</p>
                    <Link to="/get-started" className="mt-4 border border-border bg-primary text-primary-foreground text-sm font-bold uppercase tracking-widest px-6 py-3 hover:opacity-90 transition-opacity">
                        Generate Now
                    </Link>
                </div>
            ) : (
                <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {reports.map((report) => (
                        <Link 
                            key={report._id} 
                            to={`/report/${report._id}`}
                            className="flex flex-col p-6 space-y-4 border border-border bg-background hover:bg-secondary/10 transition-colors group relative overflow-hidden h-full"
                        >
                            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/20 transition-colors" />
                            
                            <div className="space-y-4 relative z-10 font-mono flex-1">
                                <h3 className="text-lg font-bold truncate uppercase tracking-tight" title={report.title}>
                                    {report.title}
                                </h3>
                                <div className="flex items-center gap-2 text-xs text-muted-foreground opacity-70">
                                    <Clock className="w-3 h-3" />
                                    <span>{new Date(report.createdAt).toLocaleDateString()}</span>
                                </div>
                            </div>

                            <div className="pt-4 mt-auto border-t border-border flex items-center justify-between relative z-10 w-full">
                                <span className="text-xs font-bold uppercase tracking-widest text-primary flex items-center gap-2">
                                    View Details <Activity className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                </span>
                                <button 
                                    onClick={async (e) => {
                                        e.preventDefault();
                                        if (window.confirm("Are you sure you want to delete this report?")) {
                                            try {
                                                await axios.delete(`http://localhost:3000/api/interview/${report._id}`, { withCredentials: true });
                                                setReports(prev => prev.filter(r => r._id !== report._id));
                                            } catch (error) {
                                                console.error("Failed to delete", error);
                                            }
                                        }
                                    }}
                                    className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Dashboard;
