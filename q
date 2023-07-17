GIT-MERGE(1)                               Git Manual                              GIT-MERGE(1)

NNAAMMEE
       git-merge - Join two or more development histories together

SSYYNNOOPPSSIISS
       _g_i_t _m_e_r_g_e [-n] [--stat] [--no-commit] [--squash] [--[no-]edit]
               [--no-verify] [-s <strategy>] [-X <strategy-option>] [-S[<keyid>]]
               [--[no-]allow-unrelated-histories]
               [--[no-]rerere-autoupdate] [-m <msg>] [-F <file>] [<commit>...]
       _g_i_t _m_e_r_g_e (--continue | --abort | --quit)

DDEESSCCRRIIPPTTIIOONN
       Incorporates changes from the named commits (since the time their histories diverged
       from the current branch) into the current branch. This command is used by _g_i_t _p_u_l_l to
       incorporate changes from another repository and can be used by hand to merge changes
       from one branch into another.

       Assume the following history exists and the current branch is "mmaasstteerr":

                     A---B---C topic
                    /
               D---E---F---G master

       Then "ggiitt mmeerrggee ttooppiicc" will replay the changes made on the ttooppiicc branch since it
       diverged from mmaasstteerr (i.e., EE) until its current commit (CC) on top of mmaasstteerr, and record
       the result in a new commit along with the names of the two parent commits and a log
       message from the user describing the changes.

                     A---B---C topic
                    /         \
               D---E---F---G---H master

       The second syntax ("ggiitt mmeerrggee ----aabboorrtt") can only be run after the merge has resulted in
       conflicts. _g_i_t _m_e_r_g_e _-_-_a_b_o_r_t will abort the merge process and try to reconstruct the
       pre-merge state. However, if there were uncommitted changes when the merge started (and
       especially if those changes were further modified after the merge was started), _g_i_t
       _m_e_r_g_e _-_-_a_b_o_r_t will in some cases be unable to reconstruct the original (pre-merge)
       changes. Therefore:

       WWaarrnniinngg: Running _g_i_t _m_e_r_g_e with non-trivial uncommitted changes is discouraged: while
       possible, it may leave you in a state that is hard to back out of in the case of a
       conflict.

       The third syntax ("ggiitt mmeerrggee ----ccoonnttiinnuuee") can only be run after the merge has resulted
       in conflicts.

OOPPTTIIOONNSS
       --commit, --no-commit
           Perform the merge and commit the result. This option can be used to override
           --no-commit.

           With --no-commit perform the merge and stop just before creating a merge commit, to
           give the user a chance to inspect and further tweak the merge result before
           committing.

           Note that fast-forward updates do not create a merge commit and therefore there is
           no way to stop those merges with --no-commit. Thus, if you want to ensure your
           branch is not changed or updated by the merge command, use --no-ff with --no-commit.

       --edit, -e, --no-edit
           Invoke an editor before committing successful mechanical merge to further edit the
           auto-generated merge message, so that the user can explain and justify the merge.
           The ----nnoo--eeddiitt option can be used to accept the auto-generated message (this is
           generally discouraged). The ----eeddiitt (or --ee) option is still useful if you are giving
           a draft message with the --mm option from the command line and want to edit it in the
           editor.

           Older scripts may depend on the historical behaviour of not allowing the user to
           edit the merge log message. They will see an editor opened when they run ggiitt mmeerrggee.
           To make it easier to adjust such scripts to the updated behaviour, the environment
           variable GGIITT__MMEERRGGEE__AAUUTTOOEEDDIITT can be set to nnoo at the beginning of them.

       --cleanup=<mode>
           This option determines how the merge message will be cleaned up before committing.
           See ggiitt--ccoommmmiitt(1) for more details. In addition, if the _<_m_o_d_e_> is given a value of
           sscciissssoorrss, scissors will be appended to MMEERRGGEE__MMSSGG before being passed on to the
           commit machinery in the case of a merge conflict.

       --ff, --no-ff, --ff-only
           Specifies how a merge is handled when the merged-in history is already a descendant
           of the current history.  ----ffff is the default unless merging an annotated (and
           possibly signed) tag that is not stored in its natural place in the rreeffss//ttaaggss//
           hierarchy, in which case ----nnoo--ffff is assumed.

           With ----ffff, when possible resolve the merge as a fast-forward (only update the branch
           pointer to match the merged branch; do not create a merge commit). When not possible
           (when the merged-in history is not a descendant of the current history), create a
           merge commit.

           With ----nnoo--ffff, create a merge commit in all cases, even when the merge could instead
           be resolved as a fast-forward.

           With ----ffff--oonnllyy, resolve the merge as a fast-forward when possible. When not
           possible, refuse to merge and exit with a non-zero status.

       -S[<keyid>], --gpg-sign[=<keyid>], --no-gpg-sign
           GPG-sign the resulting merge commit. The kkeeyyiidd argument is optional and defaults to
           the committer identity; if specified, it must be stuck to the option without a
           space.  ----nnoo--ggppgg--ssiiggnn is useful to countermand both ccoommmmiitt..ggppggSSiiggnn configuration
           variable, and earlier ----ggppgg--ssiiggnn.

       --log[=<n>], --no-log
           In addition to branch names, populate the log message with one-line descriptions
           from at most <n> actual commits that are being merged. See also ggiitt--ffmmtt--mmeerrggee--
           mmssgg(1).

           With --no-log do not list one-line descriptions from the actual commits being
           merged.

       --signoff, --no-signoff
           Add a SSiiggnneedd--ooffff--bbyy trailer by the committer at the end of the commit log message.
           The meaning of a signoff depends on the project to which you’re committing. For
           example, it may certify that the committer has the rights to submit the work under
           the project’s license or agrees to some contributor representation, such as a
           Developer Certificate of Origin. (See hhttttpp::////ddeevveellooppeerrcceerrttiiffiiccaattee..oorrgg for the one
           used by the Linux kernel and Git projects.) Consult the documentation or leadership
           of the project to which you’re contributing to understand how the signoffs are used
           in that project.

           The --no-signoff option can be used to countermand an earlier --signoff option on
           the command line.

       --stat, -n, --no-stat
           Show a diffstat at the end of the merge. The diffstat is also controlled by the
           configuration option merge.stat.

           With -n or --no-stat do not show a diffstat at the end of the merge.

       --squash, --no-squash
           Produce the working tree and index state as if a real merge happened (except for the
           merge information), but do not actually make a commit, move the HHEEAADD, or record
           $$GGIITT__DDIIRR//MMEERRGGEE__HHEEAADD (to cause the next ggiitt ccoommmmiitt command to create a merge commit).
           This allows you to create a single commit on top of the current branch whose effect
           is the same as merging another branch (or more in case of an octopus).

           With --no-squash perform the merge and commit the result. This option can be used to
           override --squash.

           With --squash, --commit is not allowed, and will fail.

       --[no-]verify
           By default, the pre-merge and commit-msg hooks are run. When ----nnoo--vveerriiffyy is given,
           these are bypassed. See also ggiitthhooookkss(5).

       -s <strategy>, --strategy=<strategy>
           Use the given merge strategy; can be supplied more than once to specify them in the
           order they should be tried. If there is no --ss option, a built-in list of strategies
           is used instead (oorrtt when merging a single head, ooccttooppuuss otherwise).

       -X <option>, --strategy-option=<option>
           Pass merge strategy specific option through to the merge strategy.

       --verify-signatures, --no-verify-signatures
           Verify that the tip commit of the side branch being merged is signed with a valid
           key, i.e. a key that has a valid uid: in the default trust model, this means the
           signing key has been signed by a trusted key. If the tip commit of the side branch
           is not signed with a valid key, the merge is aborted.

       --summary, --no-summary
           Synonyms to --stat and --no-stat; these are deprecated and will be removed in the
           future.

       -q, --quiet
           Operate quietly. Implies --no-progress.

       -v, --verbose
           Be verbose.

       --progress, --no-progress
           Turn progress on/off explicitly. If neither is specified, progress is shown if
           standard error is connected to a terminal. Note that not all merge strategies may
           support progress reporting.

       --autostash, --no-autostash
           Automatically create a temporary stash entry before the operation begins, record it
           in the special ref MMEERRGGEE__AAUUTTOOSSTTAASSHH and apply it after the operation ends. This means
           that you can run the operation on a dirty worktree. However, use with care: the
           final stash application after a successful merge might result in non-trivial
           conflicts.

       --allow-unrelated-histories
           By default, ggiitt mmeerrggee command refuses to merge histories that do not share a common
           ancestor. This option can be used to override this safety when merging histories of
           two projects that started their lives independently. As that is a very rare
           occasion, no configuration variable to enable this by default exists and will not be
           added.

       -m <msg>
           Set the commit message to be used for the merge commit (in case one is created).

           If ----lloogg is specified, a shortlog of the commits being merged will be appended to
           the specified message.

           The _g_i_t _f_m_t_-_m_e_r_g_e_-_m_s_g command can be used to give a good default for automated _g_i_t
           _m_e_r_g_e invocations. The automated message can include the branch description.

       -F <file>, --file=<file>
           Read the commit message to be used for the merge commit (in case one is created).

           If ----lloogg is specified, a shortlog of the commits being merged will be appended to
           the specified message.

       --rerere-autoupdate, --no-rerere-autoupdate
           Allow the rerere mechanism to update the index with the result of auto-conflict
           resolution if possible.

       --overwrite-ignore, --no-overwrite-ignore
           Silently overwrite ignored files from the merge result. This is the default
           behavior. Use ----nnoo--oovveerrwwrriittee--iiggnnoorree to abort.

       --abort
           Abort the current conflict resolution process, and try to reconstruct the pre-merge
           state. If an autostash entry is present, apply it to the worktree.

           If there were uncommitted worktree changes present when the merge started, _g_i_t _m_e_r_g_e
           _-_-_a_b_o_r_t will in some cases be unable to reconstruct these changes. It is therefore
           recommended to always commit or stash your changes before running _g_i_t _m_e_r_g_e.

           _g_i_t _m_e_r_g_e _-_-_a_b_o_r_t is equivalent to _g_i_t _r_e_s_e_t _-_-_m_e_r_g_e when MMEERRGGEE__HHEEAADD is present
           unless MMEERRGGEE__AAUUTTOOSSTTAASSHH is also present in which case _g_i_t _m_e_r_g_e _-_-_a_b_o_r_t applies the
           stash entry to the worktree whereas _g_i_t _r_e_s_e_t _-_-_m_e_r_g_e will save the stashed changes
           in the stash list.

       --quit
           Forget about the current merge in progress. Leave the index and the working tree
           as-is. If MMEERRGGEE__AAUUTTOOSSTTAASSHH is present, the stash entry will be saved to the stash
           list.

       --continue
           After a _g_i_t _m_e_r_g_e stops due to conflicts you can conclude the merge by running _g_i_t
           _m_e_r_g_e _-_-_c_o_n_t_i_n_u_e (see "HOW TO RESOLVE CONFLICTS" section below).

       <commit>...
           Commits, usually other branch heads, to merge into our branch. Specifying more than
           one commit will create a merge with more than two parents (affectionately called an
           Octopus merge).

           If no commit is given from the command line, merge the remote-tracking branches that
           the current branch is configured to use as its upstream. See also the configuration
           section of this manual page.

           When FFEETTCCHH__HHEEAADD (and no other commit) is specified, the branches recorded in the
           ..ggiitt//FFEETTCCHH__HHEEAADD file by the previous invocation of ggiitt ffeettcchh for merging are merged
           to the current branch.

PPRREE--MMEERRGGEE CCHHEECCKKSS
       Before applying outside changes, you should get your own work in good shape and
       committed locally, so it will not be clobbered if there are conflicts. See also ggiitt--
       ssttaasshh(1). _g_i_t _p_u_l_l and _g_i_t _m_e_r_g_e will stop without doing anything when local uncommitted
       changes overlap with files that _g_i_t _p_u_l_l/_g_i_t _m_e_r_g_e may need to update.

       To avoid recording unrelated changes in the merge commit, _g_i_t _p_u_l_l and _g_i_t _m_e_r_g_e will
       also abort if there are any changes registered in the index relative to the HHEEAADD commit.
       (Special narrow exceptions to this rule may exist depending on which merge strategy is
       in use, but generally, the index must match HEAD.)

       If all named commits are already ancestors of HHEEAADD, _g_i_t _m_e_r_g_e will exit early with the
       message "Already up to date."

FFAASSTT--FFOORRWWAARRDD MMEERRGGEE
       Often the current branch head is an ancestor of the named commit. This is the most
       common case especially when invoked from _g_i_t _p_u_l_l: you are tracking an upstream
       repository, you have committed no local changes, and now you want to update to a newer
       upstream revision. In this case, a new commit is not needed to store the combined
       history; instead, the HHEEAADD (along with the index) is updated to point at the named
       commit, without creating an extra merge commit.

       This behavior can be suppressed with the ----nnoo--ffff option.

TTRRUUEE MMEERRGGEE
       Except in a fast-forward merge (see above), the branches to be merged must be tied
       together by a merge commit that has both of them as its parents.

       A merged version reconciling the changes from all branches to be merged is committed,
       and your HHEEAADD, index, and working tree are updated to it. It is possible to have
       modifications in the working tree as long as they do not overlap; the update will
       preserve them.

       When it is not obvious how to reconcile the changes, the following happens:

        1. The HHEEAADD pointer stays the same.

        2. The MMEERRGGEE__HHEEAADD ref is set to point to the other branch head.

        3. Paths that merged cleanly are updated both in the index file and in your working
           tree.

        4. For conflicting paths, the index file records up to three versions: stage 1 stores
           the version from the common ancestor, stage 2 from HHEEAADD, and stage 3 from MMEERRGGEE__HHEEAADD
           (you can inspect the stages with ggiitt llss--ffiilleess --uu). The working tree files contain
           the result of the "merge" program; i.e. 3-way merge results with familiar conflict
           markers <<<<<< ====== >>>>>>.

        5. No other changes are made. In particular, the local modifications you had before you
           started merge will stay the same and the index entries for them stay as they were,
           i.e. matching HHEEAADD.

       If you tried a merge which resulted in complex conflicts and want to start over, you can
       recover with ggiitt mmeerrggee ----aabboorrtt.

MMEERRGGIINNGG TTAAGG
       When merging an annotated (and possibly signed) tag, Git always creates a merge commit
       even if a fast-forward merge is possible, and the commit message template is prepared
       with the tag message. Additionally, if the tag is signed, the signature check is
       reported as a comment in the message template. See also ggiitt--ttaagg(1).

       When you want to just integrate with the work leading to the commit that happens to be
       tagged, e.g. synchronizing with an upstream release point, you may not want to make an
       unnecessary merge commit.

       In such a case, you can "unwrap" the tag yourself before feeding it to ggiitt mmeerrggee, or
       pass ----ffff--oonnllyy when you do not have any work on your own. e.g.

           git fetch origin
           git merge v1.2.3^0
           git merge --ff-only v1.2.3

HHOOWW CCOONNFFLLIICCTTSS AARREE PPRREESSEENNTTEEDD
       During a merge, the working tree files are updated to reflect the result of the merge.
       Among the changes made to the common ancestor’s version, non-overlapping ones (that is,
       you changed an area of the file while the other side left that area intact, or vice
       versa) are incorporated in the final result verbatim. When both sides made changes to
       the same area, however, Git cannot randomly pick one side over the other, and asks you
       to resolve it by leaving what both sides did to that area.

       By default, Git uses the same style as the one used by the "merge" program from the RCS
       suite to present such a conflicted hunk, like this:

           Here are lines that are either unchanged from the common
           ancestor, or cleanly resolved because only one side changed.
           <<<<<<< yours:sample.txt
           Conflict resolution is hard;
           let's go shopping.
           =======
           Git makes conflict resolution easy.
           >>>>>>> theirs:sample.txt
           And here is another line that is cleanly resolved or unmodified.

       The area where a pair of conflicting changes happened is marked with markers <<<<<<<<<<<<<<,
       ==============, and >>>>>>>>>>>>>>. The part before the ============== is typically your side, and the part
       afterwards is typically their side.

       The default format does not show what the original said in the conflicting area. You
       cannot tell how many lines are deleted and replaced with Barbie’s remark on your side.
       The only thing you can tell is that your side wants to say it is hard and you’d prefer
       to go shopping, while the other side wants to claim it is easy.

       An alternative style can be used by setting the "merge.conflictStyle" configuration
       variable to "diff3". In "diff3" style, the above conflict may look like this:

           Here are lines that are either unchanged from the common
           ancestor, or cleanly resolved because only one side changed.
           <<<<<<< yours:sample.txt
           Conflict resolution is hard;
           let's go shopping.
           |||||||
           Conflict resolution is hard.
           =======
           Git makes conflict resolution easy.
           >>>>>>> theirs:sample.txt
           And here is another line that is cleanly resolved or unmodified.

       In addition to the <<<<<<<<<<<<<<, ==============, and >>>>>>>>>>>>>> markers, it uses another |||||||||||||| marker
       that is followed by the original text. You can tell that the original just stated a
       fact, and your side simply gave in to that statement and gave up, while the other side
       tried to have a more positive attitude. You can sometimes come up with a better
       resolution by viewing the original.

HHOOWW TTOO RREESSOOLLVVEE CCOONNFFLLIICCTTSS
       After seeing a conflict, you can do two things:

       •   Decide not to merge. The only clean-ups you need are to reset the index file to the
           HHEEAADD commit to reverse 2. and to clean up working tree changes made by 2. and 3.;
           ggiitt mmeerrggee ----aabboorrtt can be used for this.

       •   Resolve the conflicts. Git will mark the conflicts in the working tree. Edit the
           files into shape and _g_i_t _a_d_d them to the index. Use _g_i_t _c_o_m_m_i_t or _g_i_t _m_e_r_g_e
           _-_-_c_o_n_t_i_n_u_e to seal the deal. The latter command checks whether there is a
           (interrupted) merge in progress before calling _g_i_t _c_o_m_m_i_t.

       You can work through the conflict with a number of tools:

       •   Use a mergetool.  ggiitt mmeerrggeettooooll to launch a graphical mergetool which will work you
           through the merge.

       •   Look at the diffs.  ggiitt ddiiffff will show a three-way diff, highlighting changes from
           both the HHEEAADD and MMEERRGGEE__HHEEAADD versions.

       •   Look at the diffs from each branch.  ggiitt lloogg ----mmeerrggee --pp <<ppaatthh>> will show diffs first
           for the HHEEAADD version and then the MMEERRGGEE__HHEEAADD version.

       •   Look at the originals.  ggiitt sshhooww ::11::ffiilleennaammee shows the common ancestor, ggiitt sshhooww
           ::22::ffiilleennaammee shows the HHEEAADD version, and ggiitt sshhooww ::33::ffiilleennaammee shows the MMEERRGGEE__HHEEAADD
           version.

EEXXAAMMPPLLEESS
       •   Merge branches ffiixxeess and eennhhaanncceemmeennttss on top of the current branch, making an
           octopus merge:

               $ git merge fixes enhancements

       •   Merge branch oobbssoolleettee into the current branch, using oouurrss merge strategy:

               $ git merge -s ours obsolete

       •   Merge branch mmaaiinntt into the current branch, but do not make a new commit
           automatically:

               $ git merge --no-commit maint

           This can be used when you want to include further changes to the merge, or want to
           write your own merge commit message.

           You should refrain from abusing this option to sneak substantial changes into a
           merge commit. Small fixups like bumping release/version name would be acceptable.

MMEERRGGEE SSTTRRAATTEEGGIIEESS
       The merge mechanism (ggiitt mmeerrggee and ggiitt ppuullll commands) allows the backend _m_e_r_g_e
       _s_t_r_a_t_e_g_i_e_s to be chosen with --ss option. Some strategies can also take their own options,
       which can be passed by giving --XX<<ooppttiioonn>> arguments to ggiitt mmeerrggee and/or ggiitt ppuullll.

       ort
           This is the default merge strategy when pulling or merging one branch. This strategy
           can only resolve two heads using a 3-way merge algorithm. When there is more than
           one common ancestor that can be used for 3-way merge, it creates a merged tree of
           the common ancestors and uses that as the reference tree for the 3-way merge. This
           has been reported to result in fewer merge conflicts without causing mismerges by
           tests done on actual merge commits taken from Linux 2.6 kernel development history.
           Additionally this strategy can detect and handle merges involving renames. It does
           not make use of detected copies. The name for this algorithm is an acronym
           ("Ostensibly Recursive’s Twin") and came from the fact that it was written as a
           replacement for the previous default algorithm, rreeccuurrssiivvee.

           The _o_r_t strategy can take the following options:

           ours
               This option forces conflicting hunks to be auto-resolved cleanly by favoring _o_u_r
               version. Changes from the other tree that do not conflict with our side are
               reflected in the merge result. For a binary file, the entire contents are taken
               from our side.

               This should not be confused with the _o_u_r_s merge strategy, which does not even
               look at what the other tree contains at all. It discards everything the other
               tree did, declaring _o_u_r history contains all that happened in it.

           theirs
               This is the opposite of _o_u_r_s; note that, unlike _o_u_r_s, there is no _t_h_e_i_r_s merge
               strategy to confuse this merge option with.

           ignore-space-change, ignore-all-space, ignore-space-at-eol, ignore-cr-at-eol
               Treats lines with the indicated type of whitespace change as unchanged for the
               sake of a three-way merge. Whitespace changes mixed with other changes to a line
               are not ignored. See also ggiitt--ddiiffff(1) --bb, --ww, ----iiggnnoorree--ssppaaccee--aatt--eeooll, and
               ----iiggnnoorree--ccrr--aatt--eeooll.

               •   If _t_h_e_i_r version only introduces whitespace changes to a line, _o_u_r version
                   is used;

               •   If _o_u_r version introduces whitespace changes but _t_h_e_i_r version includes a
                   substantial change, _t_h_e_i_r version is used;

               •   Otherwise, the merge proceeds in the usual way.

           renormalize
               This runs a virtual check-out and check-in of all three stages of a file when
               resolving a three-way merge. This option is meant to be used when merging
               branches with different clean filters or end-of-line normalization rules. See
               "Merging branches with differing checkin/checkout attributes" in
               ggiittaattttrriibbuutteess(5) for details.

           no-renormalize
               Disables the rreennoorrmmaalliizzee option. This overrides the mmeerrggee..rreennoorrmmaalliizzee
               configuration variable.

           find-renames[=<n>]
               Turn on rename detection, optionally setting the similarity threshold. This is
               the default. This overrides the _m_e_r_g_e_._r_e_n_a_m_e_s configuration variable. See also
               ggiitt--ddiiffff(1) ----ffiinndd--rreennaammeess.

           rename-threshold=<n>
               Deprecated synonym for ffiinndd--rreennaammeess==<<nn>>.

           subtree[=<path>]
               This option is a more advanced form of _s_u_b_t_r_e_e strategy, where the strategy
               makes a guess on how two trees must be shifted to match with each other when
               merging. Instead, the specified path is prefixed (or stripped from the
               beginning) to make the shape of two trees to match.

       recursive
           This can only resolve two heads using a 3-way merge algorithm. When there is more
           than one common ancestor that can be used for 3-way merge, it creates a merged tree
           of the common ancestors and uses that as the reference tree for the 3-way merge.
           This has been reported to result in fewer merge conflicts without causing mismerges
           by tests done on actual merge commits taken from Linux 2.6 kernel development
           history. Additionally this can detect and handle merges involving renames. It does
           not make use of detected copies. This was the default strategy for resolving two
           heads from Git v0.99.9k until v2.33.0.

           The _r_e_c_u_r_s_i_v_e strategy takes the same options as _o_r_t. However, there are three
           additional options that _o_r_t ignores (not documented above) that are potentially
           useful with the _r_e_c_u_r_s_i_v_e strategy:

           patience
               Deprecated synonym for ddiiffff--aallggoorriitthhmm==ppaattiieennccee.

           diff-algorithm=[patience|minimal|histogram|myers]
               Use a different diff algorithm while merging, which can help avoid mismerges
               that occur due to unimportant matching lines (such as braces from distinct
               functions). See also ggiitt--ddiiffff(1) ----ddiiffff--aallggoorriitthhmm. Note that oorrtt specifically
               uses ddiiffff--aallggoorriitthhmm==hhiissttooggrraamm, while rreeccuurrssiivvee defaults to the ddiiffff..aallggoorriitthhmm
               config setting.

           no-renames
               Turn off rename detection. This overrides the mmeerrggee..rreennaammeess configuration
               variable. See also ggiitt--ddiiffff(1) ----nnoo--rreennaammeess.

       resolve
           This can only resolve two heads (i.e. the current branch and another branch you
           pulled from) using a 3-way merge algorithm. It tries to carefully detect criss-cross
           merge ambiguities. It does not handle renames.

       octopus
           This resolves cases with more than two heads, but refuses to do a complex merge that
           needs manual resolution. It is primarily meant to be used for bundling topic branch
           heads together. This is the default merge strategy when pulling or merging more than
           one branch.

       ours
           This resolves any number of heads, but the resulting tree of the merge is always
           that of the current branch head, effectively ignoring all changes from all other
           branches. It is meant to be used to supersede old development history of side
           branches. Note that this is different from the -Xours option to the _r_e_c_u_r_s_i_v_e merge
           strategy.

       subtree
           This is a modified oorrtt strategy. When merging trees A and B, if B corresponds to a
           subtree of A, B is first adjusted to match the tree structure of A, instead of
           reading the trees at the same level. This adjustment is also done to the common
           ancestor tree.

       With the strategies that use 3-way merge (including the default, _o_r_t), if a change is
       made on both branches, but later reverted on one of the branches, that change will be
       present in the merged result; some people find this behavior confusing. It occurs
       because only the heads and the merge base are considered when performing a merge, not
       the individual commits. The merge algorithm therefore considers the reverted change as
       no change at all, and substitutes the changed version instead.

CCOONNFFIIGGUURRAATTIIOONN
       merge.conflictStyle
           Specify the style in which conflicted hunks are written out to working tree files
           upon merge. The default is "merge", which shows a <<<<<<<<<<<<<< conflict marker, changes
           made by one side, a ============== marker, changes made by the other side, and then a
           >>>>>>>>>>>>>> marker. An alternate style, "diff3", adds a |||||||||||||| marker and the original
           text before the ============== marker.

       merge.defaultToUpstream
           If merge is called without any commit argument, merge the upstream branches
           configured for the current branch by using their last observed values stored in
           their remote-tracking branches. The values of the bbrraanncchh..<<ccuurrrreenntt bbrraanncchh>>..mmeerrggee that
           name the branches at the remote named by bbrraanncchh..<<ccuurrrreenntt bbrraanncchh>>..rreemmoottee are
           consulted, and then they are mapped via rreemmoottee..<<rreemmoottee>>..ffeettcchh to their corresponding
           remote-tracking branches, and the tips of these tracking branches are merged.
           Defaults to true.

       merge.ff
           By default, Git does not create an extra merge commit when merging a commit that is
           a descendant of the current commit. Instead, the tip of the current branch is
           fast-forwarded. When set to ffaallssee, this variable tells Git to create an extra merge
           commit in such a case (equivalent to giving the ----nnoo--ffff option from the command
           line). When set to oonnllyy, only such fast-forward merges are allowed (equivalent to
           giving the ----ffff--oonnllyy option from the command line).

       merge.verifySignatures
           If true, this is equivalent to the --verify-signatures command line option. See ggiitt--
           mmeerrggee(1) for details.

       merge.branchdesc
           In addition to branch names, populate the log message with the branch description
           text associated with them. Defaults to false.

       merge.log
           In addition to branch names, populate the log message with at most the specified
           number of one-line descriptions from the actual commits that are being merged.
           Defaults to false, and true is a synonym for 20.

       merge.suppressDest
           By adding a glob that matches the names of integration branches to this multi-valued
           configuration variable, the default merge message computed for merges into these
           integration branches will omit "into <branch name>" from its title.

           An element with an empty value can be used to clear the list of globs accumulated
           from previous configuration entries. When there is no mmeerrggee..ssuupppprreessssDDeesstt variable
           defined, the default value of mmaasstteerr is used for backward compatibility.

       merge.renameLimit
           The number of files to consider in the exhaustive portion of rename detection during
           a merge. If not specified, defaults to the value of diff.renameLimit. If neither
           merge.renameLimit nor diff.renameLimit are specified, currently defaults to 7000.
           This setting has no effect if rename detection is turned off.

       merge.renames
           Whether Git detects renames. If set to "false", rename detection is disabled. If set
           to "true", basic rename detection is enabled. Defaults to the value of diff.renames.

       merge.directoryRenames
           Whether Git detects directory renames, affecting what happens at merge time to new
           files added to a directory on one side of history when that directory was renamed on
           the other side of history. If merge.directoryRenames is set to "false", directory
           rename detection is disabled, meaning that such new files will be left behind in the
           old directory. If set to "true", directory rename detection is enabled, meaning that
           such new files will be moved into the new directory. If set to "conflict", a
           conflict will be reported for such paths. If merge.renames is false,
           merge.directoryRenames is ignored and treated as false. Defaults to "conflict".

       merge.renormalize
           Tell Git that canonical representation of files in the repository has changed over
           time (e.g. earlier commits record text files with CRLF line endings, but recent ones
           use LF line endings). In such a repository, Git can convert the data recorded in
           commits to a canonical form before performing a merge to reduce unnecessary
           conflicts. For more information, see section "Merging branches with differing
           checkin/checkout attributes" in ggiittaattttrriibbuutteess(5).

       merge.stat
           Whether to print the diffstat between ORIG_HEAD and the merge result at the end of
           the merge. True by default.

       merge.autoStash
           When set to true, automatically create a temporary stash entry before the operation
           begins, and apply it after the operation ends. This means that you can run merge on
           a dirty worktree. However, use with care: the final stash application after a
           successful merge might result in non-trivial conflicts. This option can be
           overridden by the ----nnoo--aauuttoossttaasshh and ----aauuttoossttaasshh options of ggiitt--mmeerrggee(1). Defaults
           to false.

       merge.tool
           Controls which merge tool is used by ggiitt--mmeerrggeettooooll(1). The list below shows the
           valid built-in values. Any other value is treated as a custom merge tool and
           requires that a corresponding mergetool.<tool>.cmd variable is defined.

       merge.guitool
           Controls which merge tool is used by ggiitt--mmeerrggeettooooll(1) when the -g/--gui flag is
           specified. The list below shows the valid built-in values. Any other value is
           treated as a custom merge tool and requires that a corresponding
           mergetool.<guitool>.cmd variable is defined.

           •   araxis

           •   bc

           •   bc3

           •   bc4

           •   codecompare

           •   deltawalker

           •   diffmerge

           •   diffuse

           •   ecmerge

           •   emerge

           •   examdiff

           •   guiffy

           •   gvimdiff

           •   gvimdiff1

           •   gvimdiff2

           •   gvimdiff3

           •   kdiff3

           •   meld

           •   nvimdiff

           •   nvimdiff1

           •   nvimdiff2

           •   nvimdiff3

           •   opendiff

           •   p4merge

           •   smerge

           •   tkdiff

           •   tortoisemerge

           •   vimdiff

           •   vimdiff1

           •   vimdiff2

           •   vimdiff3

           •   winmerge

           •   xxdiff

       merge.verbosity
           Controls the amount of output shown by the recursive merge strategy. Level 0 outputs
           nothing except a final error message if conflicts were detected. Level 1 outputs
           only conflicts, 2 outputs conflicts and file changes. Level 5 and above outputs
           debugging information. The default is level 2. Can be overridden by the
           GGIITT__MMEERRGGEE__VVEERRBBOOSSIITTYY environment variable.

       merge.<driver>.name
           Defines a human-readable name for a custom low-level merge driver. See
           ggiittaattttrriibbuutteess(5) for details.

       merge.<driver>.driver
           Defines the command that implements a custom low-level merge driver. See
           ggiittaattttrriibbuutteess(5) for details.

       merge.<driver>.recursive
           Names a low-level merge driver to be used when performing an internal merge between
           common ancestors. See ggiittaattttrriibbuutteess(5) for details.

       branch.<name>.mergeOptions
           Sets default options for merging into branch <name>. The syntax and supported
           options are the same as those of _g_i_t _m_e_r_g_e, but option values containing whitespace
           characters are currently not supported.

SSEEEE AALLSSOO
       ggiitt--ffmmtt--mmeerrggee--mmssgg(1), ggiitt--ppuullll(1), ggiittaattttrriibbuutteess(5), ggiitt--rreesseett(1), ggiitt--ddiiffff(1), ggiitt--llss--
       ffiilleess(1), ggiitt--aadddd(1), ggiitt--rrmm(1), ggiitt--mmeerrggeettooooll(1)

GGIITT
       Part of the ggiitt(1) suite

Git 2.34.1                                 04/26/2023                              GIT-MERGE(1)
