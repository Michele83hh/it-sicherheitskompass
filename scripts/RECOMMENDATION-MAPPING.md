# Recommendation ID Mapping Reference

Quick reference for DSGVO and KRITIS recommendation IDs and their categories.

## DSGVO (30 Recommendations)

### Datenschutz-Folgenabschätzung (dsfa) - 3 recommendations
- `dsfa1` - High/Medium - DSFA for high-risk processing
- `dsfa2` - High/Quick - DSFA blacklist/whitelist check
- `dsfa3` - Medium/Strategic - Systematic DSFA methodology

### Verarbeitungsverzeichnis (vv) - 3 recommendations
- `vv1` - High/Quick - Create processing register
- `vv2` - High/Medium - Complete all required fields
- `vv3` - Medium/Medium - Regular updates and audits

### Einwilligungsmanagement (ew) - 3 recommendations
- `ew1` - High/Medium - Review legal bases for processing
- `ew2` - High/Quick - Easy consent withdrawal
- `ew3` - Medium/Strategic - Central consent management system

### Betroffenenrechte (br) - 3 recommendations
- `br1` - High/Medium - Process for data subject requests
- `br2` - High/Quick - 1-month response deadline
- `br3` - Medium/Medium - Automated deletion and portability

### Datenschutzverletzungen (dv) - 3 recommendations
- `dv1` - High/Medium - 72h breach notification process
- `dv2` - High/Quick - Breach documentation and logging
- `dv3` - Medium/Strategic - Complete breach response plan

### Datenschutzbeauftragter (dsb) - 3 recommendations
- `dsb1` - High/Quick - Check DSB appointment obligation
- `dsb2` - High/Medium - DSB independence and resources
- `dsb3` - Medium/Medium - DSB tasks and reporting

### Internationaler Datentransfer (dt) - 3 recommendations
- `dt1` - High/Medium - Map third-country transfers
- `dt2` - High/Strategic - SCCs/adequacy decisions
- `dt3` - Medium/Strategic - Transfer Impact Assessment

### Technische & organisatorische Maßnahmen (tom) - 3 recommendations
- `tom1` - High/Medium - Document and implement TOMs
- `tom2` - High/Quick - Encryption and pseudonymization
- `tom3` - Medium/Strategic - Regular TOM effectiveness reviews

### Privacy by Design & Default (pbd) - 3 recommendations
- `pbd1` - High/Medium - Privacy requirements in development
- `pbd2` - High/Quick - Default privacy settings
- `pbd3` - Medium/Strategic - PbD framework integration

### Auftragsverarbeitung (av) - 3 recommendations
- `av1` - High/Medium - AV contracts per Art. 28
- `av2` - High/Quick - Due diligence for processors
- `av3` - Medium/Medium - Sub-processor management

---

## KRITIS (24 Recommendations)

### BSI-Kontaktstelle (bsi) - 3 recommendations
- `bsi1` - High/Quick - Register BSI contact point
- `bsi2` - High/Quick - Test BSI reporting channels
- `bsi3` - Medium/Medium - Communication plan with BSI

### IT-Risikomanagement (rm) - 3 recommendations
- `rm1` - High/Medium - IT risk analysis methodology
- `rm2` - High/Medium - Risk treatment plan
- `rm3` - Medium/Strategic - Continuous risk monitoring

### Vorfallmanagement (vm) - 3 recommendations
- `vm1` - High/Medium - Incident response plan
- `vm2` - High/Quick - Incident classification system
- `vm3` - Medium/Medium - Lessons learned process

### Business Continuity Management (bcm) - 3 recommendations
- `bcm1` - High/Medium - BIA for critical services
- `bcm2` - High/Medium - Emergency and recovery plans
- `bcm3` - Medium/Strategic - Regular BCM exercises

### Lieferkette (lk) - 3 recommendations
- `lk1` - High/Quick - Critical supplier inventory
- `lk2` - Medium/Medium - Supplier security requirements
- `lk3` - Low/Strategic - Supply chain risk assessment

### Audit (au) - 3 recommendations
- `au1` - High/Medium - §8a audit preparation
- `au2` - Medium/Medium - Internal audit program
- `au3` - Medium/Strategic - Continuous compliance monitoring

### Physische Sicherheit (ps) - 3 recommendations
- `ps1` - High/Medium - Physical access controls
- `ps2` - Medium/Medium - Environmental protection
- `ps3` - Low/Strategic - Comprehensive physical security concept

### Systemhärtung (sh) - 3 recommendations
- `sh1` - High/Medium - Server and endpoint hardening
- `sh2` - High/Medium - Network segmentation and firewall
- `sh3` - Medium/Strategic - Comprehensive hardening baselines

---

## Priority/Complexity Matrix

### Priority Levels
- **High** - Critical for compliance, immediate action required
- **Medium** - Important for comprehensive compliance
- **Low** - Strategic enhancement, longer-term goal

### Complexity Levels
- **Quick** - Can be implemented quickly (days to weeks)
- **Medium** - Moderate effort (weeks to months)
- **Strategic** - Significant project (months to ongoing)

## Legal References

### DSGVO
- Art. 6 - Lawfulness of processing
- Art. 7 - Conditions for consent
- Art. 12-22 - Data subject rights
- Art. 25 - Privacy by design and default
- Art. 28 - Processor requirements
- Art. 30 - Records of processing
- Art. 32 - Security of processing
- Art. 33-34 - Breach notification
- Art. 35-36 - DPIA
- Art. 37-39 - Data Protection Officer
- Art. 44-49 - International transfers

### KRITIS (BSI-Gesetz)
- §8a Abs. 1 - State of the art security measures
- §8a Abs. 3 - Audit requirements
- §8b Abs. 3 - BSI contact point
- §8b Abs. 4 - Incident reporting

---

## File Locations

### Implementation
- **Recommendations data:** `src/messages/de.json`
- **Generation script:** `scripts/write-recs-dsgvo-kritis.mjs`
- **Verification script:** `scripts/verify-recommendations.mjs`

### Domain Logic
- **DSGVO config:** `src/lib/regulations/dsgvo/config.ts`
- **DSGVO recommendations:** `src/lib/regulations/dsgvo/recommendations.ts`
- **KRITIS config:** `src/lib/regulations/kritis/config.ts`
- **KRITIS recommendations:** `src/lib/regulations/kritis/recommendations.ts`

---

## Usage in Application

Recommendations are displayed in:
1. **Results page** - `/[locale]/[regulation]/results`
2. **Category cards** - Individual category detail views
3. **PDF export** - When implemented
4. **Dashboard** - Summary view

Each recommendation includes:
- Title (action-oriented)
- Description (with legal context)
- First step (immediately actionable)
- Checklist (where applicable)
- Priority level
- Complexity estimate
