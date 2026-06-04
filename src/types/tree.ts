export interface TreeAnalysis {
  analysis_id: string;
  total_tree_count: number;
  canopy_coverage_pct: number;

  tree_health: {
    healthy: number;
    needs_care: number;
    needs_replacement: number;
  };

  observations: string[];
  recommendations: string[];

  confidence_score: number;

  overlay_image_url: string | null;
}