
import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Award, Target, TrendingUp, Lightbulb, BarChart3 } from 'lucide-react';

const AnalysisResults = ({ data }) => {
    if (!data) return null;

    const containerVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.15 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <motion.div
            className="results-container"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            style={{
                background: '#ffffff',
                borderRadius: '16px',
                padding: '3rem',
                boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
                border: '1px solid #e2e8f0',
                maxWidth: '1200px',
                margin: '2rem auto'
            }}
        >
            <div className="results-header" style={{ marginBottom: '3rem' }}>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '1rem' }}
                >
                    <Award size={28} color="#2563eb" />
                    <span style={{ fontSize: '0.85rem', fontWeight: '700', color: '#2563eb', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Analysis Report</span>
                </motion.div>
                <h2 className="results-title" style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Market Analysis Report</h2>
                <div className="results-subtitle">Strategic Intelligence & Actionable Insights</div>
            </div>

            <div className="results-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '2rem' }}>

                {/* Demand Score - Large Card */}
                <motion.div
                    className="result-card"
                    style={{
                        gridColumn: 'span 12',
                        textAlign: 'center',
                        background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.05) 0%, rgba(30, 64, 175, 0.05) 100%)',
                        border: '2px solid #dbeafe',
                        borderRadius: '16px',
                        padding: '3rem'
                    }}
                    variants={itemVariants}
                >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                        <TrendingUp size={24} color="#2563eb" />
                        <span style={{ fontSize: '0.9rem', fontWeight: '700', color: '#0f172a' }}>Product Demand Index</span>
                    </div>
                    <div className="demand-score-display" style={{ fontSize: '5rem', color: '#2563eb', marginBottom: '1rem' }}>
                        {data.product_demand?.score || 0}
                    </div>
                    <p style={{ fontStyle: 'italic', color: '#475569', marginBottom: 0, fontSize: '1.05rem', lineHeight: 1.6 }}>
                        "{data.product_demand?.summary}"
                    </p>
                </motion.div>

                {/* Consumer Preferences */}
                <motion.div
                    className="result-card"
                    style={{
                        gridColumn: 'span 6',
                        background: '#ffffff',
                        border: '1px solid #e2e8f0',
                        borderRadius: '12px',
                        padding: '2rem'
                    }}
                    variants={itemVariants}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
                        <Target size={20} color="#2563eb" />
                        <div className="card-heading" style={{ border: 'none', padding: 0, margin: 0, textAlign: 'left', fontSize: '1.2rem' }}>Consumer Preferences</div>
                    </div>
                    <ul className="pref-list" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', listStyle: 'none', padding: 0, margin: 0 }}>
                        {data.customer_preferences?.map((pref, idx) => (
                            <li key={idx} className="pref-item" style={{
                                background: '#f0f4f8',
                                color: '#0f172a',
                                padding: '0.5rem 1.25rem',
                                borderRadius: '999px',
                                fontSize: '0.9rem',
                                border: '1px solid #cbd5e1',
                                transition: 'all 0.2s'
                            }}>{pref}</li>
                        ))}
                    </ul>
                </motion.div>

                {/* Seasonal Analysis */}
                <motion.div
                    className="result-card"
                    style={{
                        gridColumn: 'span 6',
                        background: '#ffffff',
                        border: '1px solid #e2e8f0',
                        borderRadius: '12px',
                        padding: '2rem'
                    }}
                    variants={itemVariants}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
                        <BarChart3 size={20} color="#2563eb" />
                        <div className="card-heading" style={{ border: 'none', padding: 0, margin: 0, textAlign: 'left', fontSize: '1.2rem' }}>Seasonal Analysis</div>
                    </div>
                    <p style={{ lineHeight: '1.7', color: '#475569' }}>{data.seasonal_trends}</p>
                </motion.div>

                {/* Demand Trend Graph */}
                <motion.div
                    className="result-card"
                    style={{
                        gridColumn: 'span 6',
                        height: '400px',
                        background: '#ffffff',
                        border: '1px solid #e2e8f0',
                        borderRadius: '12px',
                        padding: '2rem'
                    }}
                    variants={itemVariants}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
                        <TrendingUp size={20} color="#2563eb" />
                        <div className="card-heading" style={{ border: 'none', padding: 0, margin: 0, textAlign: 'left', fontSize: '1.1rem' }}>Demand Trajectory (12M)</div>
                    </div>
                    <ResponsiveContainer width="100%" height="85%">
                        <AreaChart data={data.demand_trend || []}>
                            <defs>
                                <linearGradient id="colorDemand" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3}/>
                                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                            <XAxis dataKey="month" stroke="#64748b" style={{ fontSize: '0.8rem' }} />
                            <YAxis stroke="#64748b" style={{ fontSize: '0.8rem' }} />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#fff', border: '1px solid #cbd5e1', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
                                itemStyle={{ color: '#2563eb', fontWeight: '600' }}
                            />
                            <Area
                                type="monotone"
                                dataKey="demand"
                                stroke="#2563eb"
                                strokeWidth={3}
                                fill="url(#colorDemand)"
                                dot={{ fill: '#2563eb', r: 4 }}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </motion.div>

                {/* Strategic Recommendations */}
                <motion.div
                    className="result-card"
                    style={{
                        gridColumn: 'span 6',
                        background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.05) 0%, rgba(5, 150, 105, 0.05) 100%)',
                        border: '1px solid #ccfbf1',
                        borderRadius: '12px',
                        padding: '2rem'
                    }}
                    variants={itemVariants}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
                        <Lightbulb size={20} color="#10b981" />
                        <div className="card-heading" style={{ border: 'none', padding: 0, margin: 0, textAlign: 'left', fontSize: '1.2rem', color: '#059669' }}>Strategic Recommendations</div>
                    </div>
                    <p style={{ lineHeight: '1.7', color: '#475569' }}>{data.marketing_advice}</p>
                </motion.div>

            </div>
        </motion.div>
    );
};

export default AnalysisResults;
