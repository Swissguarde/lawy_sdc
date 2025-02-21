"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import BMSFCharts from "../components/beam-charts";
import {
  FixedEndMomentResults,
  SlopeDeflectionEquation,
} from "../types/beamTypes";
import { SpanCriticalPoints } from "../utils/criticalBMSF";

export default function BeamResultsPage() {
  const searchParams = useSearchParams();

  // Parse URL parameters
  const results = JSON.parse(searchParams.get("results") || "[]");
  const equations = JSON.parse(searchParams.get("equations") || "[]");
  const boundaryCondition = JSON.parse(
    searchParams.get("boundaryCondition") || "{}"
  );
  const finalMoments = JSON.parse(searchParams.get("finalMoments") || "{}") as {
    [key: string]: number;
  };
  const reactions = JSON.parse(searchParams.get("reactions") || "{}") as {
    [key: string]: number;
  };
  const criticalPoints = JSON.parse(searchParams.get("criticalPoints") || "[]");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="p-12 pt-24 min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-black text-white"
    >
      {/* Header Section */}
      <motion.div variants={itemVariants} className="flex items-center mb-12">
        <Link
          href="/"
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-white/5 hover:bg-white/10 backdrop-blur-lg rounded-lg transition-colors border border-white/10"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
          Back to Calculator
        </Link>
        <h2 className="text-4xl font-bold flex-1 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
          Analysis Results
        </h2>
        <div className="w-[140px]"></div>
      </motion.div>

      {/* Main Grid Layout */}
      <motion.div
        variants={containerVariants}
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
      >
        {/* Fixed End Moments Card */}
        <motion.div
          variants={itemVariants}
          className="p-6 bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl hover:bg-white/10 transition-colors"
        >
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <span className="text-blue-400">◆</span>
            Fixed End Moments
          </h2>
          <div className="space-y-4">
            {results.map((result: FixedEndMomentResults) => (
              <div key={result.spanLabel} className="p-4 bg-white/5 rounded-lg">
                <p className="text-lg font-medium mb-2">
                  Span {result.spanLabel}
                </p>
                <div className="space-y-2 pl-4">
                  <p className="flex justify-between">
                    <span>FEM{result.spanLabel}:</span>
                    <span className="font-mono">
                      {result.startMoment.toFixed(2)}
                      <span className="text-sm text-green-400 ml-1">KNM</span>
                    </span>
                  </p>
                  <p className="flex justify-between">
                    <span>
                      FEM{result.spanLabel.split("").reverse().join("")}:
                    </span>
                    <span className="font-mono">
                      {result.endMoment.toFixed(2)}
                      <span className="text-sm text-green-400 ml-1">KNM</span>
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Slope Deflection Equations Card */}
        <motion.div
          variants={itemVariants}
          className="p-6 bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl hover:bg-white/10 transition-colors"
        >
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <span className="text-purple-400">◆</span>
            Slope Deflection Equations
          </h2>
          <div className="space-y-4">
            {equations.map((eq: SlopeDeflectionEquation) => {
              if (!eq.startEquation && !eq.endEquation) return null;
              return (
                <div key={eq.spanLabel} className="p-4 bg-white/5 rounded-lg">
                  <p className="text-lg font-medium mb-2">
                    Span {eq.spanLabel}
                  </p>
                  <div className="space-y-2 pl-4">
                    {eq.startEquation && (
                      <p className="font-mono text-sm">
                        M{eq.spanLabel} ={" "}
                        <span className="text-blue-300">
                          {eq.startEquation}
                        </span>
                      </p>
                    )}
                    {eq.endEquation && (
                      <p className="font-mono text-sm">
                        M{eq.spanLabel.split("").reverse().join("")} ={" "}
                        <span className="text-blue-300">{eq.endEquation}</span>
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Boundary Conditions Card */}
        {boundaryCondition && (
          <motion.div
            variants={itemVariants}
            className="p-6 bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl hover:bg-white/10 transition-colors"
          >
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <span className="text-green-400">◆</span>
              Boundary Conditions
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-white/5 rounded-lg">
                <p className="text-sm text-gray-400 mb-1">θB</p>
                <p className="font-mono text-lg">
                  {boundaryCondition.thetaB.toFixed(6)}
                </p>
              </div>
              <div className="p-4 bg-white/5 rounded-lg">
                <p className="text-sm text-gray-400 mb-1">θC</p>
                <p className="font-mono text-lg">
                  {boundaryCondition.thetaC.toFixed(6)}
                </p>
              </div>
              {boundaryCondition.thetaD !== undefined && (
                <div className="p-4 bg-white/5 rounded-lg col-span-2">
                  <p className="text-sm text-gray-400 mb-1">θD</p>
                  <p className="font-mono text-lg">
                    {boundaryCondition.thetaD.toFixed(6)}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Final Moments Card */}
        {finalMoments && Object.keys(finalMoments).length > 0 && (
          <motion.div
            variants={itemVariants}
            className="p-6 bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl hover:bg-white/10 transition-colors"
          >
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <span className="text-yellow-400">◆</span>
              Final Moments
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(finalMoments).map(([key, value]) => (
                <div key={key} className="p-4 bg-white/5 rounded-lg">
                  <p className="text-sm text-gray-400 mb-1">{key}</p>
                  <p className="font-mono text-lg">
                    {value.toFixed(2)}
                    <span className="text-sm text-green-400 ml-1">KNM</span>
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Support Reactions Card */}
        {reactions && Object.keys(reactions).length > 0 && (
          <motion.div
            variants={itemVariants}
            className="p-6 bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl hover:bg-white/10 transition-colors"
          >
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <span className="text-red-400">◆</span>
              Support Reactions
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(reactions).map(([key, value]) => (
                <div key={key} className="p-4 bg-white/5 rounded-lg">
                  <p className="text-sm text-gray-400 mb-1">{key}</p>
                  <p className="font-mono text-lg">
                    {value.toFixed(2)}
                    <span className="text-sm text-green-400 ml-1">KN</span>
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* BMSF Results Card - Full Width */}
        <motion.div
          variants={itemVariants}
          className="col-span-full p-6 bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl hover:bg-white/10 transition-colors"
        >
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <span className="text-indigo-400">◆</span>
            Bending Moments and Shear Forces
          </h2>
          <div className="space-y-6">
            {criticalPoints?.map((span: SpanCriticalPoints) => (
              <div
                key={span.spanLabel}
                className="border border-white/10 rounded-lg overflow-hidden"
              >
                <div className="bg-white/10 px-6 py-3">
                  <p className="font-semibold">Span {span.spanLabel}</p>
                </div>
                <div className="p-4">
                  <div className="grid grid-cols-3 gap-4 mb-2 text-gray-400 text-sm">
                    <div>Location</div>
                    <div>Bending Moment</div>
                    <div>Shear Force</div>
                  </div>
                  {span.criticalPoints.map((point, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-3 gap-4 py-3 border-t border-white/5"
                    >
                      <div className="font-mono">{point.location}</div>
                      <div className="font-mono">
                        {point.bendingMoment.toFixed(2)}
                        <span className="text-sm text-green-400 ml-1">KNm</span>
                      </div>
                      <div className="font-mono">
                        {point.shearForce.toFixed(2)}
                        <span className="text-sm text-green-400 ml-1">KN</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Charts Section - Full Width */}
        {criticalPoints && criticalPoints.length > 0 && (
          <motion.div variants={itemVariants} className="col-span-full mt-8">
            <BMSFCharts criticalPoints={criticalPoints} />
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}
