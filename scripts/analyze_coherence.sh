#!/bin/bash
# Agent Hephaestus Tool: Coherence Analysis v1.0
COMMIT_MESSAGE=$1

echo "Analyzing commit for coherence: \"$COMMIT_MESSAGE\""

# This is a simple, rules-based simulation of a complex AI analysis.
# A true Hephaestus would use a fine-tuned LLM to analyze the full code diff
# and score its adherence to the project's architectural principles.

if [[ "$COMMIT_MESSAGE" == *"HOTFIX:"* ]] || \
   [[ "$COMMIT_MESSAGE" == *"FEATURE:"* ]] || \
   [[ "$COMMIT_MESSAGE" == *"REFACTOR:"* ]] || \
   [[ "$COMMIT_MESSAGE" == *"DOCS:"* ]]; then
    echo "Coherence Check PASSED: Commit message follows structured intent protocol."
    exit 0
else
    echo "************************************************************************"
    echo "* COHERENCE CHECK FAILED: Dissonance Detected. Deployment Halted."
    echo "* Reason: Commit message lacks a clear Intent Descriptor (e.g., 'FEATURE:', 'FIX:')."
    echo "* This is a governance protocol to ensure all changes are deliberate and trackable."
    echo "************************************************************************"
    exit 1
fi
