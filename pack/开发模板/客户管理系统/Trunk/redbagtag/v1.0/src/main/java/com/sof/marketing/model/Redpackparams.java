package com.sof.marketing.model;

import java.io.Serializable;

public class Redpackparams implements Serializable {
    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	/**
     * redpackparams.id
     * @ibatorgenerated 2018-04-17 21:29:15
     */
    private Integer id;

    /**
     * redpackparams.pid (红包任务ID)
     * @ibatorgenerated 2018-04-17 21:29:15
     */
    private Integer pid;

    /**
     * redpackparams.pkey (配置属性名称)
     * @ibatorgenerated 2018-04-17 21:29:15
     */
    private String pkey;

    /**
     * redpackparams.pvalue (配置属性值)
     * @ibatorgenerated 2018-04-17 21:29:15
     */
    private String pvalue;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getPid() {
        return pid;
    }

    public void setPid(Integer pid) {
        this.pid = pid;
    }

    public String getPkey() {
        return pkey;
    }

    public void setPkey(String pkey) {
        this.pkey = pkey;
    }

    public String getPvalue() {
        return pvalue;
    }

    public void setPvalue(String pvalue) {
        this.pvalue = pvalue;
    }
}